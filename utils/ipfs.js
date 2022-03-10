import { IPFS_CLIENT } from '../config';

export const uploadArt = async (buffer) => {
  const result = await IPFS_CLIENT.add(buffer);
  return result.path;
};

export const uploadMetadata = async (metadata) => {
  const objectString = JSON.stringify(metadata);
  const bufferedString = Buffer.from(objectString);
  const result = await IPFS_CLIENT.add(bufferedString);
  return result.path;
};
