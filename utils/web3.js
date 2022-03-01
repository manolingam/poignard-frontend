// -------------- NOT YET USED --------------

// import { Contract, utils } from 'ethers';

// //  --- FUNCTION TO FETCH AN ENS NAME ---
// export const getENSFromAddress = async (ethersProvider, address) => {
//   const ens = await ethersProvider.lookupAddress(address);
//   return ens || 'Not Found';
// };

// // --- FUNCTION TO SIGN A MESSAGE ---
// export const getSignature = async (ethersProvider) => {
//   const signer = ethersProvider.getSigner();
//   //
//   const signature = await signer.signMessage('');
//   return signature;
// };

// export const mint = async (ethersProvider, contractAddress) => {
//   const abiInterface = new utils.Interface([
//     // the mint function interface
//   ]);
//   const contract = new Contract(contractAddress, abiInterface, ethersProvider);
//   // calling the actual mint function
//   return contract.mint();
// };
