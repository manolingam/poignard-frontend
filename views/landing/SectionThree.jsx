import { Flex, VStack, Heading, Button, Text } from '@chakra-ui/react';
import Link from 'next/link';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';

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

export const SectionThree = () => {
  return (
    <Flex
      id='section-three'
      direction='column'
      alignItems='center'
      justifyContent='center'
      px={{ base: '2rem', lg: '8rem' }}
      py={{ base: '2rem', lg: '2rem' }}
    >
      <VStack spacing={5} justifyContent='center'>
        <StyledHeading>
          Are you a collector, philanthropist, NFT ape? Support our artists
          today!
        </StyledHeading>
        <StyledBodyText>
          Your purchase is a badge of honor. Your money goes fully and directly
          to humanitarian aid in Ukraine. The smart contract behind PoignART
          makes it impossible for our team to ever touch your money.{' '}
        </StyledBodyText>
        <br />
        <StyledBodyText>
          If you wish, you can resell the NFT for yourself. Every time an NFT is
          resold, 2.5% of the sale goes to Unchain Fund. Each work of art is a
          gift that keeps on giving!{' '}
        </StyledBodyText>
        <br />
        <StyledBodyText>
          We stand against virtue signaling, opaque money management, and
          middlemen taking a cut. NFTs are transparent, verifiable, and
          traceable. PoignART is, and will always be, run by volunteers.
        </StyledBodyText>
        <br />

        <Link href='/explore' passHref>
          <StyledPrimaryButton
            mr='1rem'
            fontSize={{ base: '16px', lg: '18px' }}
          >
            Explore Art
          </StyledPrimaryButton>
        </Link>
      </VStack>
    </Flex>
  );
};
