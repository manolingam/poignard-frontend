import axios from 'axios';

export const verifyArtist = async (ethAddress, signature) => {
  const result = await axios.post('/api/verify', { ethAddress, signature });
  return result;
};

export const submitArtistInfo = async (artist, signature) => {
  const result = await axios.post('/api/artist', { artist, signature });
  return result;
};

export const submitVoucher = async (token, signature) => {
  const result = await axios.post('/api/voucher', { token, signature });
  return result;
};

export const redeemVoucher = async (redeem, signature) => {
  const result = await axios.post('/api/redeem', { redeem, signature });
  return result;
};

export const fetchVouchers = async (signature, minted, contentType) => {
  const result = await axios.post('/api/graphql/vouchers', {
    signature,
    minted,
    contentType
  });
  return result;
};

export const fetchArtist = async (signature, ethAddress) => {
  const result = await axios.post('/api/graphql/artist', {
    signature,
    ethAddress
  });
  return result;
};
