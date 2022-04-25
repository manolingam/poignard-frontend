import { TwitterApi } from 'twitter-api-v2';
import { devMode } from '../../../config';

const devModeOrigins = ['http://localhost:3000', 'https://rinkeby.poign.art'];

const prodModeOrigins = ['https://poign.art'];

const TWITTER_CLIENT = new TwitterApi({
  appKey: devMode
    ? process.env.TWITTER_APP_KEY_DEV
    : process.env.TWITTER_APP_KEY_PROD,
  appSecret: devMode
    ? process.env.TWITTER_APP_SECRET_DEV
    : process.env.TWITTER_APP_SECRET_PROD,
  accessToken: devMode
    ? process.env.TWITTER_ACCESS_TOKEN_SECRET_DEV
    : process.env.TWITTER_ACCESS_TOKEN_SECRET_PROD,
  accessSecret: devMode
    ? process.env.TWITTER_ACCESS_SECRET_DEV
    : process.env.TWITTER_ACCESS_SECRET_PROD
});

const rwTwitterClient = TWITTER_CLIENT.readWrite;

const handler = async (req, res) => {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  if (req.method === 'POST') {
    try {
      await rwTwitterClient.v2.tweet(req.body.message);
      res.status(201).json('success');
    } catch (err) {
      console.log(err);
      res.status(500).json('Internal server error');
    }
  }
};

const withOrigin = (handler) => {
  return async (req, res) => {
    if (req.headers.referer === undefined) {
      return res.status(400).json('Bad request');
    }
    if (
      devMode
        ? !devModeOrigins.includes(new URL(req.headers.referer).origin)
        : !prodModeOrigins.includes(new URL(req.headers.referer).origin)
    ) {
      return res.status(403).json({ success: false, message: `Forbidden` });
    }
    return handler(req, res);
  };
};

export default withOrigin(handler);
