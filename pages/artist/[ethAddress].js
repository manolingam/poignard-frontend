import { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Meta } from '../../shared/Meta';
import { Header } from '../../shared/Header';
import { Footer } from '../../shared/Footer';
import { AllVouchers } from '../../views/artist/AllVouchers';

const Artist = () => {
  const router = useRouter();
  const { ethAddress } = router.query;

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
      <Meta />
      <Header windowWidth={windowWidth} />
      <AllVouchers artistAddress={ethAddress} />
      <Footer />
    </Flex>
  );
};

export default Artist;
