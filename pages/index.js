import { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';

import { theme } from '../themes/theme';

import { Meta } from '../shared/Meta';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';

import { Manifesto } from '../views/landing/Manifesto';
import { Intro } from '../views/landing/Intro';

export default function Home() {
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
      minH='100vh'
      w='100%'
      direction='column'
      fontFamily={theme.fonts.poppins}
    >
      <Meta />
      <Header windowWidth={windowWidth} />
      <Intro />
      <Manifesto />
      <Footer />
    </Flex>
  );
}
