import axios from 'axios';
import jwt from 'jsonwebtoken';

import { API_ENDPOINT, JWT_SECRET } from '../../config';

const handler = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  if (req.method === 'POST') {
    try {
      const typeQuery = `query fetchVouchers { vouchers(where:{minted: ${req.body.minted}, contentType: "${req.body.contentType}"}) { _id tokenID tokenURI metadata createdBy {name ethAddress merkleProof} minPrice minted signature contentType mintedBy createdAt} }`;
      const defaultQuery = `query fetchVouchers { vouchers(where:{minted: ${req.body.minted}}) { _id tokenID tokenURI metadata createdBy {name ethAddress merkleProof} minPrice signature contentType mintedBy minted createdAt} }`;

      const graphqlQuery = {
        operationName: 'fetchVouchers',
        query: req.body.contentType !== 'all' ? typeQuery : defaultQuery,
        variables: {}
      };

      const token = jwt.sign(req.body.signature, JWT_SECRET);
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
