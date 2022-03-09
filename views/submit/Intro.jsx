import { useContext } from 'react';
import { Flex, Text, Heading, Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';
import { AppContext } from '../../context/AppContext';

const StyledPrimaryHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  letter-spacing: 1.2px;
  line-height: 1.5;
  color: ${theme.colors.brand.black};
`;

const StyledBodyText = styled(Text)`
  max-width: 720px;
  font-family: ${theme.fonts.spaceMono};
  line-height: 1.8;
  color: ${theme.colors.brand.darkCharcoal};
  text-align: justify;
`;

const StyledTag = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.darkCharcoal};
  text-align: justify;
  text-transform: uppercase;
  font-weight: bold;
  margin: auto;
`;

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

export const Intro = () => {
  const context = useContext(AppContext);
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
        Donate any art in support of Ukraine and the team at PoignART will help
        you quickly turn it into an NFT! We will use the entirety of our social
        network and resources to get your art seen, to make sure it pierces
        human hearts like the poignard dagger that inspired our platform’s name.
      </StyledBodyText>
      <br />

      <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }}>
        Upload original media (audio, video, gif, photos, pictures, drawings
        etc.) in high quality and let PoignART platform do the rest!
      </StyledBodyText>
      <br />
      {!context.signerAddress && (
        <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
          You must be logged in to submit an artwork.
        </StyledTag>
      )}
      {context.signerAddress && (
        <StyledButton
          minW={{ base: 'auto' }}
          fontSize={{ base: '16px', lg: '18px' }}
          mr='1rem'
          onClick={() => {
            context.updateStage('next');
          }}
        >
          Verify Whitelist
        </StyledButton>
      )}
    </Flex>
  );
};
