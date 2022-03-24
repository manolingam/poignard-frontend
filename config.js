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

export const IN_APP_VOUCHERS_LIMIT =
  process.env.NEXT_PUBLIC_INAPP_VOUCHERS_LIMIT;
export const MAX_FILE_SIZE_MB = 25;
export const IMAGES_PER_RENDER = 15;

export const SIGNING_DOMAIN_NAME = 'PoignardVoucher';
export const SIGNING_DOMAIN_VERSION = '1';
export const POIGNARD_CONTRACT_ADDRESS =
  '0x68334b6AF11d08B23cc32a63f116517b2Ee6E502';

export const META_DATA_CREATED_BY = 'PoignART';
export const META_DATA_EXTERNAL_URL = 'https://www.poign.art/';
