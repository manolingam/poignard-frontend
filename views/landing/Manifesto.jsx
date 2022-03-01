import {
  Flex,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  SkeletonCircle
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { StyledPrimaryButton } from '../../themes/buttons';

import { theme } from '../../themes/theme';

const StyledPrimaryHeading = styled(Heading)`
  font-family: ${theme.fonts.poppins};
  letter-spacing: 1.2px;
  line-height: 1.5;
  color: ${theme.colors.ukraine.azure};
`;

const StyledHeadingLabels = styled(Heading)`
  font-family: ${theme.fonts.poppins};
  letter-spacing: 2px;
  text-align: 'center';
  color: ${theme.colors.ukraine.azure};
`;

const StyledBodyText = styled(Text)`
  max-width: 720px;
  font-family: ${theme.fonts.poppins};
  line-height: 1.8;
  color: ${theme.colors.brand.black};
  text-align: justify;
`;

const StyledCardText = styled(Text)`
  max-width: 720px;
  font-family: ${theme.fonts.poppins};
  line-height: 1.8;
  color: ${theme.colors.ukraine.azure};
  text-align: left;
`;

import { cardItems } from '../../utils/constants';

export const Manifesto = () => {
  return (
    <Flex
      id='manifesto'
      minHeight='100vh'
      direction='column'
      alignItems='center'
      justifyContent='center'
      px={{ base: '2rem', lg: '8rem' }}
      py='6rem'
    >
      <VStack spacing={5} justifyContent='center'>
        <StyledPrimaryHeading
          fontSize={{ base: '1.5rem', lg: '36px' }}
          mb='1rem'
        >
          Lorem ipsum
        </StyledPrimaryHeading>
        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </StyledBodyText>
        <br />
        <StyledPrimaryButton
          fontSize={{ base: '16px', lg: '18px' }}
          onClick={() => (window.location.href = '/submit')}
        >
          Submit your art
        </StyledPrimaryButton>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} gap={5} mt='6rem'>
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
              <StyledHeadingLabels fontSize={{ base: '16px' }} mb={3}>
                {item.name}
              </StyledHeadingLabels>
              <SkeletonCircle size='100' my='.5rem' />

              <StyledCardText fontSize={{ base: '16px' }}>
                {item.text}
              </StyledCardText>
            </Flex>
          );
        })}
      </SimpleGrid>
    </Flex>
  );
};
