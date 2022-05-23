import {
  Flex,
  VStack,
  Heading,
  Button,
  Text,
  Link as ChakraLink,
  Image as ChakraImage,
  Box
} from '@chakra-ui/react';
import { useEffect } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';

// import warship from '../../public/assets/featured/warship.webp';
// import frame from '../../public/assets/featured/frame.webp';
// import newukraine from '../../public/assets/featured/newukraine.webp';
// import cyberfox from '../../public/assets/featured/cyberfox.webp';
// import farmers from '../../public/assets/featured/farmers.webp';
// import blade from '../../public/assets/featured/blade.webp';

// const featuredImages = [warship, frame, newukraine, cyberfox, farmers, blade];

const StyledPrimaryButton = styled(Button)`
  height: 50px;
  width: auto;

  text-transform: uppercase;
  border-radius: 3px;
  color: ${theme.colors.brand.white};
  background: ${theme.colors.brand.yellow};
  box-decoration-break: clone;
  padding-left: 24px;
  padding-right: 24px;
`;

const StyledBodyText = styled(Text)`
  color: ${theme.colors.brand.graniteGrey};
  font-size: 20px;
`;

const StyledHeading = styled(Heading)`
  color: ${theme.colors.brand.black};
  font-family: ${theme.fonts.spaceGrotesk};
  font-size: 35px;
  margin-bottom: 1rem;
`;

const StyledText = styled(Text)`
  color: ${theme.colors.brand.spanishGrey};
  font-size: 20px;
`;

export const SectionTwo = () => {
  useEffect(() => {
    const M = require('materialize-css');
    M.AutoInit();
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.carousel');
      M.Carousel.init(elems, {});
    });
  }, []);
  return (
    <Flex
      id='section-two'
      direction='column'
      alignItems='center'
      justifyContent='center'
      px={{ base: '2rem', lg: '8rem' }}
      pt={{ base: '2rem', lg: '4rem' }}
      bg={theme.colors.brand.white}
    >
      <VStack spacing={5} justifyContent='center'>
        <StyledHeading>
          Art has always made the world a better place. Artists of the world, we
          call upon you!
        </StyledHeading>
        <StyledBodyText>
          Today, your work will save lives and move hearts. Upload original
          media (photos, illustrations, drawings, poems, etc.) in high quality
          and let us do the rest. We will use the entirety of our social network
          and resources to get your art seen, so that it pierces human hearts
          like the poignard dagger that inspired our team. Minting an NFT costs
          money but we use{' '}
          <ChakraLink
            textDecoration='underline'
            href='https://nftschool.dev/tutorial/lazy-minting/'
            isExternal
          >
            “lazy minting”
          </ChakraLink>{' '}
          which makes this free for you.
        </StyledBodyText>
        <br />
        <StyledText maxW='960px' px='2rem'>
          1. Get approved{' '}
          <ChakraLink
            textDecoration='underline'
            href='https://docs.google.com/forms/d/e/1FAIpQLSff5aorK4Yjrfa4ws50byFxHxzQKt1Czv1F5iYE3IPxY7iaQQ/viewform'
            isExternal
          >
            here
          </ChakraLink>{' '}
          by whitelisting yourself.
          <br />
          2. Connect your{' '}
          <ChakraLink
            textDecoration='underline'
            href='https://metamask.io/faqs/'
            isExternal
          >
            wallet
          </ChakraLink>{' '}
          to proceed. <br />
          3. Upload your artwork. <br />
          4. Set the sale price. <br />
          5. See your creative work become humanitarian aid!
        </StyledText>

        <Link href='/submit' passHref>
          <StyledPrimaryButton
            mr='1rem'
            fontSize={{ base: '16px', lg: '18px' }}
            _hover={{
              opacity: 0.7
            }}
          >
            Donate Art
          </StyledPrimaryButton>
        </Link>
      </VStack>

      <Flex className='carousel' mt='3rem' mb='3rem' h='350px'>
        <Box
          className='carousel-item'
          href='#one!'
          boxShadow='-6px -6px 9px #e0e0e0,
                  6px 6px 9px #fcfcfc'
          cursor='pointer'
        >
          <ChakraImage src='/assets/featured/warship.webp' alt='featured art' />
        </Box>
        <Box
          className='carousel-item'
          href='#two!'
          boxShadow='-6px -6px 9px #e0e0e0,
                  6px 6px 9px #fcfcfc'
          cursor='pointer'
        >
          <ChakraImage src='/assets/featured/frame.webp' alt='featured art' />
        </Box>
        <Box
          className='carousel-item'
          href='#three!'
          boxShadow='-6px -6px 9px #e0e0e0,
                  6px 6px 9px #fcfcfc'
          cursor='pointer'
        >
          <ChakraImage
            src='/assets/featured/newukraine.webp'
            alt='featured art'
          />
        </Box>
        <Box
          className='carousel-item'
          href='#four!'
          boxShadow='-6px -6px 9px #e0e0e0,
                  6px 6px 9px #fcfcfc'
          cursor='pointer'
        >
          <ChakraImage
            src='/assets/featured/cyberfox.webp'
            alt='featured art'
          />
        </Box>
        <Box
          className='carousel-item'
          href='#five!'
          boxShadow='-6px -6px 9px #e0e0e0,
                  6px 6px 9px #fcfcfc'
          cursor='pointer'
        >
          <ChakraImage src='/assets/featured/farmers.webp' alt='featured art' />
        </Box>
        <Box
          className='carousel-item'
          href='#six!'
          boxShadow='-6px -6px 9px #e0e0e0,
                  6px 6px 9px #fcfcfc'
          cursor='pointer'
        >
          <ChakraImage src='/assets/featured/blade.webp' alt='featured art' />
        </Box>
      </Flex>
    </Flex>
  );
};
