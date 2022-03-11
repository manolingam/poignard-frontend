import axios from 'axios';
import jwt from 'jsonwebtoken';

const graphqlQuery = {
  operationName: 'fetchVouchers',
  query: `query fetchVouchers { vouchers { _id tokenID tokenURI minPrice signature createdAt updatedAt} }`,
  variables: {}
};

const handler = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  if (req.method === 'POST') {
    try {
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
