/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { Flex } from '@chakra-ui/react';

import { AppContext } from '../context/AppContext';

import { theme } from '../themes/theme';

import { Meta } from '../shared/Meta';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';

import { Manifesto } from '../views/landing/Manifesto';
import { Intro } from '../views/landing/Intro';
import { SocialProofs } from '../views/landing/SocialProofs';

export default function Home() {
  const context = useContext(AppContext);
  const [windowWidth, setWindowWidth] = useState('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener('resize', () => {});
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth);
    });

    context.fetchAllVouchersInContext('all');
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
      <SocialProofs />
      <Footer />
    </Flex>
  );
}
