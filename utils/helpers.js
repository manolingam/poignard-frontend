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
