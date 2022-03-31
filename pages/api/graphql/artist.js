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
      const defaultQuery = `query fetchArtist 
      { artist(where:{ethAddress: "${req.body.ethAddress}"}) { 
        name 
        bio 
        ethAddress 
        website
        instagramHandle
        twitterHandle
        discordHandle
        telegramHandle
        merkleProof
        createdVouchers {
          tokenID 
          tokenURI 
          minPrice 
          signature 
          metadata
          minted 
          mintedBy 
          createdAt
          contentType}
        }
      }`;

      const graphqlQuery = {
        operationName: 'fetchArtist',
        query: defaultQuery,
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
