import { PutObjectCommand } from '@aws-sdk/client-s3';

import {
  SIGNING_DOMAIN_NAME,
  SIGNING_DOMAIN_VERSION,
  POIGNARD_CONTRACT_ADDRESS,
  S3_CLIENT
} from '../config';

export const getAccountString = (account) => {
  const len = account.length;
  return `0x${account.substr(2, 3).toUpperCase()}...${account
    .substr(len - 3, len - 1)
    .toUpperCase()}`;
};

export const generateNFTVoucher = (tokenId, uri, minPrice, chainId) => {
  const domain = {
    name: SIGNING_DOMAIN_NAME,
    version: SIGNING_DOMAIN_VERSION,
    verifyingContract: POIGNARD_CONTRACT_ADDRESS,
    chainId
  };

  const voucher = { tokenId, uri, minPrice };

  const types = {
    NFTVoucher: [
      { name: 'tokenId', type: 'uint256' },
      { name: 'minPrice', type: 'uint256' },
      { name: 'uri', type: 'string' }
    ]
  };

  return { domain, types, voucher };
};

export const uploadToBucket = async (_uri, _file) => {
  const urlReader = new FileReader();
  urlReader.addEventListener('load', async () => {
    const params = {
      Bucket: 'poignart',
      Key: _uri.replace('ipfs://', ''),
      Body: Buffer.from(urlReader.result),
      ACL: 'public-read',
      ContentType: _file.type
    };
    await S3_CLIENT.send(new PutObjectCommand(params));
  });
  urlReader.readAsArrayBuffer(_file);
};

export const uriToHttp = (uri) => {
  const protocol = uri.split(':')[0].toLowerCase();
  switch (protocol) {
    case 'ipfs':
      const hash = uri.match(/^ipfs:(\/\/)?(.*)$/i)?.[2];
      return `https://poignart.infura-ipfs.io/ipfs/${hash}/`;
    default:
      return [];
  }
};
