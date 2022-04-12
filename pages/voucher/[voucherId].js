import { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { fetchVoucher, fetchVouchers } from '../../utils/requests';

import { Meta } from '../../shared/Meta';
import { Header } from '../../shared/Header';
import { Footer } from '../../shared/Footer';
import { Voucher } from '../../shared/Voucher';

const Artist = ({ voucher }) => {
  const [windowWidth, setWindowWidth] = useState('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener('resize', () => {});
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const {
    metadata: { title, description, image },
  } = voucher ?? { metadata: {} };

  return (
    <Flex direction='column' w='100%'>
      <Meta
        {...{
          title,
          description,
          // TODO convert image from ipfs:// to valid https:// URL
          image,
        }}
      />
      <Header windowWidth={windowWidth} />
      <Voucher voucherId={voucher.tokenID.toString()} />
      <Footer />
    </Flex>
  );
};

export async function getStaticPaths() {
  const { data } = await fetchVouchers(null, 'all');

  const paths = data.data.vouchers.map((v) => ({
    params: { voucherId: v.tokenID.toString() },
  }));

  return { paths, fallback: true };
}

export const getStaticProps = async (context) => {
  const voucherId = context.params?.voucherId;

  const { data } = await fetchVoucher(Number(voucherId));

  return {
    props: {
      voucher: data.data.voucher,
    },
    revalidate: 1,
  };
};

export default Artist;
