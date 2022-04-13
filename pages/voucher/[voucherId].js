import { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';

import jwt from 'jsonwebtoken';
import axios from 'axios';

import { Meta } from '../../shared/Meta';
import { Header } from '../../shared/Header';
import { Footer } from '../../shared/Footer';
import { Voucher } from '../../shared/Voucher';

import {
  JWT_SECRET,
  API_ENDPOINT,
  POIGNART_BUCKET_BASE_URL
} from '../../config';

export const getStaticPaths = async () => {
  const allQuery = `query fetchVouchers { vouchers { tokenID } }`;

  const graphqlQuery = {
    operationName: 'fetchVouchers',
    query: allQuery,
    variables: {}
  };

  const token = jwt.sign({}, JWT_SECRET);

  const { data } = await axios.post(`${API_ENDPOINT}/graphql`, graphqlQuery, {
    headers: {
      authorization: 'Bearer ' + token
    }
  });

  const paths = data.data.vouchers.map((voucher) => {
    return {
      params: { voucherId: voucher.tokenID.toString() }
    };
  });

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async (context) => {
  const { voucherId } = context.params;

  const defaultQuery = `query fetchVoucher 
      { voucher(where:{tokenID: ${voucherId}}) { 
        tokenID
        tokenURI
        minPrice
        signature
        minted
        metadata
        mintedBy
        contentType
        createdAt
        createdBy {
            name
            ethAddress
            merkleProof
         }
        }
      }`;

  const graphqlQuery = {
    operationName: 'fetchVoucher',
    query: defaultQuery,
    variables: {}
  };

  const token = jwt.sign({}, JWT_SECRET);

  const { data } = await axios.post(`${API_ENDPOINT}/graphql`, graphqlQuery, {
    headers: {
      authorization: 'Bearer ' + token
    }
  });

  return {
    props: { voucher: data.data.voucher }
  };
};

const Artist = ({ voucher }) => {
  const [windowWidth, setWindowWidth] = useState('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener('resize', () => {});
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <Flex direction='column' w='100%'>
      <Meta
        title={voucher.metadata.title}
        description={voucher.metadata.description}
        image={`${POIGNART_BUCKET_BASE_URL}/${voucher.metadata.image.replace(
          'ipfs://',
          ''
        )}`}
        url={`${window.location.origin}/voucher/${voucher.tokenID}`}
      />
      <Header windowWidth={windowWidth} />
      <Voucher voucher={voucher} />
      <Footer />
    </Flex>
  );
};

export default Artist;
