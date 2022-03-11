import axios from 'axios';

export const verifyArtist = async (ethAddress, signature) => {
  const result = await axios.post('/api/verify', { ethAddress, signature });
  return result;
};
