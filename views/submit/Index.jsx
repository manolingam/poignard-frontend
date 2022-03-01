import { Flex, Input, Text, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';
import ArtUploader from '../../components/ArtUploader';

const StyledPrimaryHeading = styled(Heading)`
  font-family: ${theme.fonts.poppins};
  letter-spacing: 1.2px;
  line-height: 1.5;
  color: ${theme.colors.ukraine.azure};
`;

const StyledBodyText = styled(Text)`
  max-width: 720px;
  font-family: ${theme.fonts.poppins};
  line-height: 1.8;
  color: ${theme.colors.brand.black};
  text-align: justify;
`;

export const StyledInput = styled(Input)`
  background: 'white';
  border: 2px solid ${theme.colors.ukraine.azure};
  border-radius: 0;
`;

export const Index = () => {
  return (
    <Flex
      direction='column'
      py='2rem'
      px={{ base: '1rem', lg: '4rem' }}
      mx='1rem'
    >
      <StyledPrimaryHeading fontSize={{ base: '1.5rem', lg: '36px' }} mb='1rem'>
        Submit your art
      </StyledPrimaryHeading>

      <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </StyledBodyText>
      <br />

      <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </StyledBodyText>
      <br />

      <ArtUploader />
    </Flex>
  );
};
