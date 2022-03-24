import axios from 'axios';
import jwt from 'jsonwebtoken';

const API_ENDPOINT =
  process.env.ENV_MODE === 'development'
    ? process.env.API_BASE_URL_DEV
    : process.env.API_BASE_URL_PROD;

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
        merkleProof
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
        `${API_ENDPOINT}/graphql`,
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
