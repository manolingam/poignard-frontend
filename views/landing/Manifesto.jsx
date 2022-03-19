import {
  Flex,
  VStack,
  Heading,
  Button,
  Text,
  SimpleGrid,
  Image,
  Tooltip
} from '@chakra-ui/react';
import { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import { AppContext } from '../../context/AppContext';
import { theme } from '../../themes/theme';
import { illustrations } from '../../utils/constants';
import { FAQ } from '../../shared/Faq';

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
  text-align: center;
`;

const StyledHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.black};
  text-align: center;
  font-size: 35px;
  margin-bottom: 1rem;
`;

export const Manifesto = () => {
  const context = useContext(AppContext);
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      px={{ base: '2rem', lg: '8rem' }}
      py={{ base: '2rem', lg: '6rem' }}
    >
      <VStack spacing={5} justifyContent='center'>
        <StyledHeading>Make Art - Stop War!</StyledHeading>
        <StyledBodyText fontSize='20px' maxW='960px' px='2rem'>
          Create Ukraine-themed art to show support and raise money for Ukraine
          suffering under Russian invasion. Art has always made the world a
          better place. Today, your art will save lives and move hearts. Create
          and upload your art in a few easy steps.
        </StyledBodyText>
        <br />
        <Flex direction='row'>
          <Link href='/submit' passHref>
            <StyledPrimaryButton
              mr='1rem'
              fontSize={{ base: '16px', lg: '18px' }}
            >
              Submit Artwork
            </StyledPrimaryButton>
          </Link>
          <StyledPrimaryButton
            fontSize={{ base: '16px', lg: '18px' }}
            onClick={() => context.updateFaqModalStatus(true)}
          >
            FAQ
          </StyledPrimaryButton>
        </Flex>
        <FAQ />
      </VStack>

      <SimpleGrid
        columns={{ base: 1, md: 1, lg: 3 }}
        gridGap={{ base: 5, lg: 20 }}
        mt='8rem'
        placeItems='center'
      >
        <Tooltip label='Author: @placeholder'>
          <Image
            src={illustrations.ghostOfKhiv}
            alt='featured art'
            w={{ base: '300px' }}
          />
        </Tooltip>

        <Tooltip label='Author: @placeholder'>
          <Image
            src={illustrations.peace}
            alt='featured art'
            w={{ base: '300px' }}
          />
        </Tooltip>

        <Tooltip label='Author: @CybertoothKat'>
          <Image
            src={illustrations.cyberfox}
            alt='featured art'
            w={{ base: '300px' }}
          />
        </Tooltip>
      </SimpleGrid>
    </Flex>
  );
};
