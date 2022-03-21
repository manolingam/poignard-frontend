import axios from 'axios';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  if (req.method === 'POST') {
    try {
      const defaultQuery = `query fetchArtist 
      { artist(where:{ethAddress: "${req.body.ethAddress}"}) { 
        name 
        bio 
        ethAddress 
        instagramHandle
        twitterHandle
        createdVouchers {
          tokenID 
          tokenURI 
          minPrice 
          signature 
          metadata
          minted 
          mintedBy 
          contentType}
        }
      }`;

      const graphqlQuery = {
        operationName: 'fetchArtist',
        query: defaultQuery,
        variables: {}
      };

      const token = jwt.sign(req.body.signature, process.env.JWT_SECRET);
      const { data } = await axios.post(
        `${process.env.API_BASE_URL}/graphql`,
        graphqlQuery,
        {
          headers: {
            authorization: 'Bearer ' + token
          }
        }
      );

      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json('Internal server error');
    }
  }
};

export default handler;
