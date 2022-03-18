import axios from 'axios';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  if (req.method === 'POST') {
    try {
      const graphqlQuery = {
        operationName: 'fetchVouchers',
        query: `query fetchVouchers { vouchers(where:{minted: ${req.body.minted}, contentType: "${req.body.contentType}"}) { _id tokenID tokenURI metadata createdBy {name} minPrice signature contentType mintedBy} }`,
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
