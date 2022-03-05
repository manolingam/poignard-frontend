import {
  Flex,
  VStack,
  Heading,
  Button,
  Text,
  SimpleGrid,
  Skeleton
} from '@chakra-ui/react';
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

const StyledHeadingLabels = styled(Heading)`
  font-family: ${theme.fonts.poppins};
  letter-spacing: 2px;
  text-align: 'center';
  color: ${theme.colors.ukraine.azure};
`;

const StyledBodyText = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.blackCharcoal};
  text-align: justify;
`;

// const StyledCardText = styled(Text)`
//   max-width: 720px;
//   font-family: ${theme.fonts.poppins};
//   line-height: 1.8;
//   color: ${theme.colors.ukraine.azure};
//   text-align: left;
// `;

import { cardItems } from '../../utils/constants';

export const Manifesto = () => {
  return (
    <Flex
      id='manifesto'
      direction='column'
      alignItems='center'
      justifyContent='center'
      px={{ base: '2rem', lg: '8rem' }}
      py='6rem'
    >
      <VStack spacing={5} justifyContent='center'>
        <Heading
          fontFamily={theme.fonts.spaceGrotesk}
          color={theme.colors.brand.black}
          fontSize={{ lg: '24px' }}
          textAlign='center'
          mb='1rem'
        >
          Call to action for creators, punchy statement creating desire to
          artists to rally and submit work.
        </Heading>
        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          Create Ukraine-themed art to show support and raise money for
          Ukrainians left homeless, hungry, and in need of evacuation. Art
          always made the world better. Today, your art will save lives and move
          hearts. Create and upload your art in a few easy steps.
        </StyledBodyText>
        <br />
        <StyledPrimaryButton
          fontSize={{ base: '16px', lg: '18px' }}
          onClick={() => (window.location.href = '/submit')}
        >
          Submit your art
        </StyledPrimaryButton>
      </VStack>

      <SimpleGrid
        h='200px'
        w='100%'
        columns={{ base: 1, md: 1, lg: 3 }}
        gridGap={10}
        mt='8rem'
      >
        <Text
          fontFamily={theme.fonts.spaceGrotesk}
          color={theme.colors.brand.yellow}
          fontWeight='bold'
          fontSize={{ lg: '50px' }}
        >
          Featured Mints
        </Text>
        <Skeleton height='100%' w='100%' />
        <Skeleton height='100%' w='100%' />
      </SimpleGrid>

      {/* <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} gap={5} mt='6rem'>
        {cardItems.map((item, index) => {
          return (
            

            <Flex
              maxWidth='350px'
              key={index}
              direction='column'
              alignItems='center'
              justifyContent='space-evenly'
              py='2rem'
              px='1.5rem'
              bg={theme.colors.ukraine.yellow}
              borderTop='2px solid'
              borderColor={theme.colors.ukraine.azure}
            >
              <SkeletonCircle size='100' my='.5rem' />

              <StyledCardText fontSize={{ base: '16px' }}>
                {item.text}
              </StyledCardText>
            </Flex>
          );
        })}
      </SimpleGrid> */}
    </Flex>
  );
};
