import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Heading
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { AppContext } from '../context/AppContext';

import { Meta } from '../shared/Meta';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { Intro } from '../views/submit/Intro';
import { ArtistForm } from '../views/submit/ArtistForm';
import { ArtworkForm } from '../views/submit/ArtworkForm';
// import { FAQ } from '../shared/Faq';

import { theme } from '../themes/theme';

const StyledSecondaryHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  letter-spacing: 1.2px;
  color: ${theme.colors.brand.darkCharcoal};
`;

const stageHeadings = {
  1: 'Artist Details',
  2: 'ArtWork Details'
};

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
    <Flex direction='column' width='100vw' minHeight='100vh'>
      <Meta />
      <Header windowWidth={windowWidth} navLinks={false} />
      <Flex
        direction='column'
        justifyContent='space-between'
        alignItems='center'
        px={{ base: '1rem', lg: '4rem' }}
        mb='1rem'
      >
        {context.stage > 1 && context.stage < 4 && (
          <Flex direction='row' alignItems='center' mr='auto' mb='2rem'>
            <CircularProgress
              value={context.stage - 1}
              thickness='4px'
              max={2}
              color={theme.colors.brand.darkCharcoal}
            >
              <CircularProgressLabel
                color={theme.colors.brand.darkCharcoal}
                fontFamily={theme.fonts.spaceMono}
                fontSize={{ base: '20px', lg: '26px' }}
              >
                {context.stage - 1}
              </CircularProgressLabel>
            </CircularProgress>{' '}
            <StyledSecondaryHeading
              fontSize={{ base: '20px', lg: '26px' }}
              ml='1rem'
            >
              {stageHeadings[context.stage - 1]}
            </StyledSecondaryHeading>
          </Flex>
        )}

        {context.stage === 1 && <Intro />}
        {context.stage === 2 && <ArtistForm />}
        {context.stage === 3 && <ArtworkForm />}
        {context.stage === 4 && (window.location.href = '/')}

        {/* <FAQ /> */}
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Join;
