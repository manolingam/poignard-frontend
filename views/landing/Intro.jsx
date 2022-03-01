import { Flex, SimpleGrid, Image, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';

import {
  StyledPrimaryButton,
  StyledSecondaryButton
} from '../../themes/buttons';

import { theme } from '../../themes/theme';

const StyledPrimaryHeading = styled(Heading)`
  font-family: ${theme.fonts.poppins};
  letter-spacing: 1.2px;
  line-height: 1.5;
  color: ${theme.colors.ukraine.azure};
`;

export const Intro = () => {
  return (
    <SimpleGrid
      rows='1'
      placeItems='center'
      py='2rem'
      px={{ base: '1rem', lg: '4rem' }}
      mx='1rem'
    >
      <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        alignItems='center'
        justifyContent='space-between'
      >
        <Flex
          direction='column'
          justifyContent='center'
          alignItems='start'
          maxW={{ lg: '50%' }}
        >
          <StyledPrimaryHeading maxW='720px' fontSize={{ lg: '36px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </StyledPrimaryHeading>
          <Flex
            w='100%'
            mt={{ base: '2rem' }}
            direction='row'
            justifyContent={{ base: 'center', lg: 'flex-start' }}
          >
            <StyledPrimaryButton
              onClick={() => (window.location.href = '')}
              minW={{ base: 'auto' }}
              fontSize={{ base: '16px', lg: '18px' }}
              mr='1rem'
            >
              CTA1
            </StyledPrimaryButton>
            <StyledSecondaryButton
              onClick={() => (window.location.href = '')}
              minW={{ base: 'auto' }}
              fontSize={{ base: '16px', lg: '18px' }}
            >
              CTA2
            </StyledSecondaryButton>
          </Flex>
        </Flex>
        <Image
          src='/assets/flag__illustration.png'
          alt='ukraine flag illustraion'
          width={{ base: '450px', md: '500px', lg: '550px' }}
        />
      </Flex>
    </SimpleGrid>
  );
};
