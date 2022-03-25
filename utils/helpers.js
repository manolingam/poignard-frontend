import {
  SIGNING_DOMAIN_NAME,
  SIGNING_DOMAIN_VERSION,
  POIGNARD_CONTRACT_ADDRESS
} from '../config';

export const getAccountString = (account) => {
  const len = account.length;
  return `0x${account.substr(2, 3).toUpperCase()}...${account
    .substr(len - 3, len - 1)
    .toUpperCase()}`;
};

export const generateNFTVoucher = (tokenId, uri, minPrice, chainId) => {
  console.log(
    SIGNING_DOMAIN_NAME,
    SIGNING_DOMAIN_VERSION,
    POIGNARD_CONTRACT_ADDRESS
  );
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

export const uriToHttp = (uri) => {
  const protocol = uri.split(':')[0].toLowerCase();
  switch (protocol) {
    case 'data':
      return [uri];
    case 'https':
      return [uri];
    case 'http':
      return ['https' + uri.substr(4), uri];
    case 'ipfs':
      const hash = uri.match(/^ipfs:(\/\/)?(.*)$/i)?.[2];
      return `https://poignart.infura-ipfs.io/ipfs/${hash}/`;
    case 'ipns':
      const name = uri.match(/^ipns:(\/\/)?(.*)$/i)?.[2];
      return [
        `https://cloudflare-ipfs.com/ipns/${name}/`,
        `https://ipfs.io/ipns/${name}/`
      ];
    case 'ar':
      const tx = uri.match(/^ar:(\/\/)?(.*)$/i)?.[2];
      return [`https://arweave.net/${tx}`];
    default:
      return [];
  }
};
