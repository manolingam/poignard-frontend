import {
  Flex,
  VStack,
  Heading,
  Button,
  Text,
  SimpleGrid,
  Skeleton,
  Image as ChakraImage,
  Link as ChakraLink
} from '@chakra-ui/react';
import Link from 'next/link';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';
import { featuredImages } from '../../utils/constants';

const StyledPrimaryButton = styled(Button)`
  height: 50px;
  width: auto;
  font-family: ${theme.fonts.spaceGrotesk};
  text-transform: uppercase;
  border-radius: 3px;
  color: ${theme.colors.brand.black};
  background: ${theme.colors.brand.yellow};
  box-decoration-break: clone;
  padding-left: 24px;
  padding-right: 24px;
  &:hover {
    opacity: 0.6;
  }
`;

const StyledBodyText = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.blackCharcoal};
  text-align: justify;
`;

const StyledHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.black};
  text-align: center;
  font-size: 35px;
  margin-bottom: 1rem;
`;

const StyledText = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.spanishGrey};
  font-size: 20px;
`;

export const SectionTwo = () => {
  return (
    <Flex
      id='section-two'
      direction='column'
      alignItems='center'
      justifyContent='center'
      px={{ base: '2rem', lg: '8rem' }}
      py={{ base: '2rem', lg: '6rem' }}
    >
      <VStack spacing={5} justifyContent='center'>
        <StyledHeading>
          Art has always made the world a better place. Artists of the world, we
          call upon you!
        </StyledHeading>
        <StyledBodyText fontSize='20px' maxW='960px' px='2rem'>
          Today, your work will save lives and move hearts. Upload original
          media (photos, illustrations, drawings, poems, etc.) in high quality
          and let us do the rest. We will use the entirety of our social network
          and resources to get your art seen, so that it pierces human hearts
          like the poignard dagger that inspired our team.
        </StyledBodyText>
        <br />
        <StyledText maxW='960px' px='2rem'>
          1. Get approved here{' '}
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
          3. Upload your artwork. Minting an NFT costs money but we use{' '}
          <ChakraLink
            textDecoration='underline'
            href='https://nftschool.dev/tutorial/lazy-minting/'
            isExternal
          >
            “lazy minting”
          </ChakraLink>{' '}
          which makes this free for you. <br />
          4. Set the sale price. <br />
          5. See your creative work become humanitarian aid!
        </StyledText>

        <Link href='/submit' passHref>
          <StyledPrimaryButton
            mr='1rem'
            fontSize={{ base: '16px', lg: '18px' }}
          >
            Donate Art
          </StyledPrimaryButton>
        </Link>
      </VStack>

      <SimpleGrid
        w='100%'
        columns={{ base: 1, lg: 3 }}
        gridGap={{ base: 5, lg: 20 }}
        mt='8rem'
        placeItems='center'
      >
        {featuredImages.map((image, index) => (
          <ChakraImage
            key={index}
            src={image}
            fallback={<Skeleton h='250px' w='250px' />}
            width='250px'
            height='250px'
            objectFit='cover'
            alt='featured art'
            loading='lazy'
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};
