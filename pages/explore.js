import { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';

import axios from 'axios';
import jwt from 'jsonwebtoken';

import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { AllVouchers } from '../views/explore/AllVouchers';

import { theme } from '../themes/theme';

import { JWT_SECRET, API_ENDPOINT } from '../config';

export const getServerSideProps = async () => {
  const token = jwt.sign({}, JWT_SECRET);
  const queries = [
    {
      operationName: 'fetchMintedVouchers',
      query: `query fetchMintedVouchers { vouchers(where:{minted: ${true}}) { _id tokenID tokenURI metadata createdBy {name ethAddress merkleProof} minPrice signature contentType mintedBy minted createdAt} }`,
      variables: {}
    },
    {
      operationName: 'fetchUnMintedVouchers',
      query: `query fetchUnMintedVouchers { vouchers(where:{minted: ${false}}) { _id tokenID tokenURI metadata createdBy {name ethAddress merkleProof} minPrice signature contentType mintedBy minted createdAt} }`,
      variables: {}
    }
  ];

  let mintedVouchers = await axios.post(`${API_ENDPOINT}/graphql`, queries[0], {
    headers: {
      authorization: 'Bearer ' + token
    }
  });
  mintedVouchers = mintedVouchers.data.data.vouchers;
  mintedVouchers = mintedVouchers.sort((a, b) => b.createdAt - a.createdAt);

  let unmintedVouchers = await axios.post(
    `${API_ENDPOINT}/graphql`,
    queries[1],
    {
      headers: {
        authorization: 'Bearer ' + token
      }
    }
  );
  unmintedVouchers = unmintedVouchers.data.data.vouchers;
  unmintedVouchers = unmintedVouchers.sort((a, b) => b.createdAt - a.createdAt);

  return {
    props: {
      mintedVouchers,
      unmintedVouchers
    }
  };
};

const Explore = ({ mintedVouchers, unmintedVouchers }) => {
  const [windowWidth, setWindowWidth] = useState('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener('resize', () => {});
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <Flex
      direction='column'
      width='100vw'
      minHeight='100vh'
      justifyContent='space-between'
    >
      <Header windowWidth={windowWidth} />
      <AllVouchers
        mintedVouchers={mintedVouchers}
        unmintedVouchers={unmintedVouchers}
      />
      <Footer />
    </Flex>
  );
};

export default Explore;
