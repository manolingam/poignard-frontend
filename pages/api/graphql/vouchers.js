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
      const typeQuery = `query fetchVouchers { vouchers(where:{minted: ${req.body.minted}, contentType: "${req.body.contentType}"}) { _id tokenID tokenURI metadata createdBy {name ethAddress merkleProof} minPrice signature contentType mintedBy} }`;
      const defaultQuery = `query fetchVouchers { vouchers(where:{minted: ${req.body.minted}}) { _id tokenID tokenURI metadata createdBy {name ethAddress merkleProof} minPrice signature contentType mintedBy} }`;

      const graphqlQuery = {
        operationName: 'fetchVouchers',
        query: req.body.contentType !== 'all' ? typeQuery : defaultQuery,
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
