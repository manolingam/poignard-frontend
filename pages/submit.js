import { useState, useEffect, useContext } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { AppContext } from '../context/AppContext';

import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
// import { FAQ } from '../shared/Faq';

import { Index } from '../views/submit/Index';

const Join = () => {
  const context = useContext(AppContext);

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
      width='100vw'
      minHeight='100vh'
      direction='column'
      justifyContent='space-between'
      alignItems='center'
    >
      <Box px={{ base: '2rem', lg: '5rem' }} w='100%'>
        <Header windowWidth={windowWidth} navLinks={false} />
      </Box>

      <Index />

      {/* <FAQ /> */}
      <Footer />
    </Flex>
  );
};

export default Join;
