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
import Image from 'next/image';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';

import warship from '../../public/assets/featured/warship.png';
import frame from '../../public/assets/featured/frame.png';
import newukraine from '../../public/assets/featured/newukraine.png';
import cyberfox from '../../public/assets/featured/cyberfox.png';
import farmers from '../../public/assets/featured/farmers.jpg';
import blade from '../../public/assets/featured/blade.jpg';

const featuredImages = [warship, frame, newukraine, cyberfox, farmers, blade];

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
  font-size: 20px;
`;

const StyledHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.black};
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
      py={{ base: '2rem', lg: '4rem' }}
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
          >
            Donate Art
          </StyledPrimaryButton>
        </Link>
      </VStack>

      <SimpleGrid
        w='100%'
        columns={{ base: 1, lg: 3 }}
        gridGap={{ base: 5, lg: 20 }}
        mt='4rem'
        placeItems='center'
      >
        {featuredImages.map((image, index) => (
          <Image
            key={index}
            src={image}
            placeholder='blur'
            width='250px'
            height='250px'
            objectFit='cover'
            alt='featured art'
            priority
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};
