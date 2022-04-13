import axios from 'axios';
import jwt from 'jsonwebtoken';

import { API_ENDPOINT, JWT_SECRET } from '../../../config';

const handler = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  if (req.method === 'POST') {
    try {
      const defaultQuery = `query fetchVoucher 
      { voucher(where:{tokenID: ${req.body.tokenId}}) { 
        tokenID
        tokenURI
        minPrice
        signature
        minted
        metadata
        mintedBy
        contentType
        createdAt
        createdBy {
            name
            ethAddress
            merkleProof
         }
        }
      }`;

      const graphqlQuery = {
        operationName: 'fetchVoucher',
        query: defaultQuery,
        variables: {}
      };

      const token = jwt.sign({}, JWT_SECRET);
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
