import { Contract, utils } from 'ethers';

import { POIGNARD_CONTRACT_ADDRESS } from '../config';

export const redeem = async (
  ethersProvider,
  redeemerAddress,
  voucher,
  voucherSignature,
  artistMerkleProof
) => {
  const abiInterface = new utils.Interface([
    ' function redeem(address redeemer, tuple(uint256 tokenId, uint256 minPrice, string uri), bytes calldata signature, bytes32[] calldata merkleProof) public payable returns (uint256)'
  ]);
  const contract = new Contract(
    POIGNARD_CONTRACT_ADDRESS,
    abiInterface,
    ethersProvider.getSigner()
  );
  return contract.redeem(
    redeemerAddress,
    [voucher.tokenId, voucher.minPrice, voucher.uri],
    voucherSignature,
    artistMerkleProof,
    {
      value: voucher.minPrice
    }
  );
};

export const getMinPrice = async (ethersProvider) => {
  const abiInterface = new utils.Interface([
    'function minimumPrice() public view returns (uint)'
  ]);
  const contract = new Contract(
    POIGNARD_CONTRACT_ADDRESS,
    abiInterface,
    ethersProvider
  );

  return contract.minimumPrice();
};

export const getTokenURI = async (tokenID, ethersProvider) => {
  const abiInterface = new utils.Interface([
    'function tokenURI(uint256 tokenId) public view virtual override returns (string memory)'
  ]);
  const contract = new Contract(
    POIGNARD_CONTRACT_ADDRESS,
    abiInterface,
    ethersProvider
  );

  return contract.tokenURI(tokenID);
};
