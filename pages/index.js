/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { Flex } from '@chakra-ui/react';

import { theme } from '../themes/theme';

import { Meta } from '../shared/Meta';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';

import { SectionOne } from '../views/landing/SectionOne';
import { SectionTwo } from '../views/landing/SectionTwo';
import { SectionThree } from '../views/landing/SectionThree';
import { SectionFour } from '../views/landing/SectionFour';
import { SectionFive } from '../views/landing/SectionFive';
import { SectionSix } from '../views/landing/SectionSix';
import { SectionSeven } from '../views/landing/SectionSeven';

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
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <SectionSeven />
      <Footer />
    </Flex>
  );
}
