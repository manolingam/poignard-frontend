import {
  SimpleGrid,
  Flex,
  Text,
  Image,
  Heading,
  Button
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';

const StyledButton = styled(Button)`
  height: 50px;
  width: 100%;
  font-family: ${theme.fonts.spaceGrotesk};
  text-transform: uppercase;
  border: 2px solid ${theme.colors.brand.black};
  border-radius: 3px;
  color: ${theme.colors.brand.black};
  background: white;
  box-decoration-break: clone;
  padding-left: 24px;
  padding-right: 24px;
  &:hover {
    opacity: 0.6;
  }
`;

const StyledHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.black};
  margin-bottom: 2rem;
  font-size: 35px;
`;

const StyledText = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.darkCharcoal};
  font-size: 20px;
`;

export const Intro = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 1, lg: 2 }}
      gridGap={20}
      placeItems='center'
      px={{ base: '2rem', lg: '8rem' }}
      py={{ base: '2rem', lg: '4rem' }}
    >
      <Flex direction='column' alignItems='start' justifyContent='center'>
        <StyledHeading>
          Freedom is under attack. <br /> Creators are fighting back!
        </StyledHeading>
        <StyledText mb='1rem'>
          We are a platform for artists to create NFTs in support of Ukraine
          helping:
        </StyledText>
        <StyledText>
          1. Upload your Ukraine-themed art to be turned into NFT. <br />
          2. Set the sales price. <br />
          3. 100% of proceeds go via Unchain.fund to vetted NGOs.
        </StyledText>
        <Flex
          w='100%'
          mt={{ base: '2rem' }}
          direction='row'
          justifyContent={{ base: 'center', lg: 'flex-start' }}
        >
          <StyledButton
            onClick={() => (window.location.href = '')}
            minW={{ base: 'auto' }}
            fontSize={{ base: '16px', lg: '18px' }}
            mr='1rem'
          >
            Explore Art
          </StyledButton>
          <StyledButton
            onClick={() => (window.location.href = '/submit')}
            minW={{ base: 'auto' }}
            fontSize={{ base: '16px', lg: '18px' }}
          >
            Donate Art
          </StyledButton>
        </Flex>
      </Flex>
      <Image
        src='assets/illustration__one.png'
        alt='illustration'
        w='600px'
        h='auto'
      />
    </SimpleGrid>
  );
};
