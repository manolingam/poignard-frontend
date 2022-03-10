import axios from 'axios';

export const verifyArtist = async (ethAddress) => {
  const result = await axios.post('/api/verify', { ethAddress });
  return result;
};
