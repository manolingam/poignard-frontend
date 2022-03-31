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
      const token = jwt.sign(req.body.signature, JWT_SECRET);
      const { data } = await axios.post(
        `${API_ENDPOINT}/api/whitelist`,
        { ethAddress: req.body.ethAddress },
        {
          headers: {
            authorization: 'Bearer ' + token
          }
        }
      );
      res.status(201).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

export default handler;
