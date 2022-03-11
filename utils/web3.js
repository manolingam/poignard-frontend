import { Contract, utils } from 'ethers';

import { MINTER_ROLE_BYTES, POIGNARD_CONTRACT_ADDRESS } from '../config';

export const getENSFromAddress = async (ethersProvider, address) => {
  const ens = await ethersProvider.lookupAddress(address);
  return ens || 'Not Found';
};

export const vetArtist = async (ethersProvider, artistAddress, merkleProof) => {
  const abiInterface = new utils.Interface([
    'function vetArtist(address artist, bytes32[] memory _merkleProof) public'
  ]);
  const contract = new Contract(
    POIGNARD_CONTRACT_ADDRESS,
    abiInterface,
    ethersProvider.getSigner()
  );
  return contract.vetArtist(artistAddress, merkleProof);
};

export const checkMinterRole = async (ethersProvider, artistAddress) => {
  try {
    const abiInterface = new utils.Interface([
      'function hasRole(bytes32, address) public view virtual override returns (bool)'
    ]);
    const contract = new Contract(
      POIGNARD_CONTRACT_ADDRESS,
      abiInterface,
      ethersProvider
    );
    return contract.hasRole(MINTER_ROLE_BYTES, artistAddress);
  } catch (e) {
    console.log(e);
  }
};
