import { create } from 'ipfs-http-client';

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

export const SIGNING_DOMAIN_NAME = 'PoignardVoucher';
export const SIGNING_DOMAIN_VERSION = '1';
export const POIGNARD_CONTRACT_ADDRESS =
  '0x7c151012a251307a4ac54691Bf1B88A858A9ea4f';
export const MINTER_ROLE_BYTES =
  '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6';

export const META_DATA_CREATED_BY = 'PoignART';
export const META_DATA_EXTERNAL_URL =
  'https://poignard-frontend-git-develop-manolingam.vercel.app';
