import { create } from 'ipfs-http-client';
import { S3Client } from '@aws-sdk/client-s3';

export const SECRETS = {
  INFURA_KEY: process.env.NEXT_PUBLIC_INFURA_KEY,
  INFURA_IPFS_ID: process.env.NEXT_PUBLIC_INFURA_IPFS_ID,
  INFURA_IPFS_SECRET: process.env.NEXT_PUBLIC_INFURA_IPFS_SECRET
};

export const IPFS_CLIENT = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(
      SECRETS.INFURA_IPFS_ID + ':' + SECRETS.INFURA_IPFS_SECRET
    ).toString('base64')}`
  }
});

export const S3_CLIENT = new S3Client({
  endpoint: process.env.NEXT_PUBLIC_S3_ENDPOINT,
  region: process.env.NEXT_PUBLIC_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_ACCESS_SECRET
  }
});

export const devMode =
  process.env.NEXT_PUBLIC_ENV_MODE === 'development' ? true : false;

export const CHAIN_ID = devMode ? 4 : 1;
export const POIGNARD_CONTRACT_ADDRESS = devMode
  ? process.env.NEXT_PUBLIC_DEV_POIGNART_CONTRACT_ADDRESS
  : process.env.NEXT_PUBLIC_PROD_POIGNART_CONTRACT_ADDRESS;
export const META_DATA_EXTERNAL_URL = devMode
  ? process.env.NEXT_PUBLIC_DEV_META_DATA_EXTERNAL_URL
  : process.env.NEXT_PUBLIC_PROD_META_DATA_EXTERNAL_URL;

export const API_ENDPOINT = devMode
  ? process.env.API_BASE_URL_DEV
  : process.env.API_BASE_URL_PROD;

export const JWT_SECRET = devMode
  ? process.env.JWT_SECRET_DEV
  : process.env.JWT_SECRET_PROD;

export const OPENSEA_BASE_URL = devMode
  ? 'https://testnets.opensea.io'
  : 'https://opensea.io';

export const POIGNART_BUCKET_BASE_URL =
  'https://poignart.ams3.cdn.digitaloceanspaces.com';

export const UNCHAIN_INCOME_API = process.env.UNCHAIN_INCOME_API;

export const IN_APP_VOUCHERS_LIMIT =
  process.env.NEXT_PUBLIC_INAPP_VOUCHERS_LIMIT;
export const MAX_FILE_SIZE_MB = process.env.NEXT_PUBLIC_MAX_FILE_SIZE_MB;
export const VOUCHERS_PER_PAGE = process.env.NEXT_PUBLIC_IMAGES_PER_RENDER;

export const META_DATA_CREATED_BY = 'PoignART';
export const SIGNING_DOMAIN_NAME = 'PoignartVoucher';
export const SIGNING_DOMAIN_VERSION = '1';

export const CHAIN_NAME = {
  1: 'mainnet',
  4: 'rinkeby'
};

export const ACCEPTED_IMAGE_FILE_FORMATS = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/webp'
];

export const ACCEPTED_VIDEO_FILE_FORMATS = ['video/mp4'];

export const ACCEPTED_AUDIO_FILE_FORMATS = [
  'audio/mp3',
  'audio/mpeg',
  'audio/wav'
];

export const WHITELIST_ADMINS = [
  '0x8760e565273b47195f76a22455ce0b68a11af5b5',
  '0xe68967c95f5a9bccfdd711a2cbc23ec958f147ef',
  '0x53d7b5bcfcebe7df3f8d8947be4976d814275a8e',
  '0x9da847cd29d0da97fbfaee0692d336857cf00cd3',
  '0x1e9c89aff77215f3ad26bffe0c50d4fdeba6a352',
  //test address
  '0xc9f2d9adfa6c24ce0d5a999f2ba3c6b06e36f75e',
  '0x9ae7b89bcebe350cbbcdb7dd66e89c7d3629d641'
];
