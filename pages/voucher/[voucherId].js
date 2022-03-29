import { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Meta } from '../../shared/Meta';
import { Header } from '../../shared/Header';
import { Footer } from '../../shared/Footer';
import { Voucher } from '../../shared/Voucher';

const Artist = () => {
  const router = useRouter();
  const { voucherId } = router.query;

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
      <Meta />
      <Header windowWidth={windowWidth} />
      <Voucher voucherId={voucherId} />
      <Footer />
    </Flex>
  );
};

export default Artist;
