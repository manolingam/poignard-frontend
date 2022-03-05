import {
  SimpleGrid,
  Flex,
  Text,
  Skeleton,
  Heading,
  UnorderedList,
  ListItem,
  Button
} from '@chakra-ui/react';
import styled from '@emotion/styled';

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

import { theme } from '../../themes/theme';

export const Intro = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 1, lg: 2 }}
      gridGap={20}
      alignItems='center'
      pb='2rem'
      px={{ base: '1rem', lg: '4rem' }}
      mx='1rem'
    >
      <Flex direction='column' justifyContent='center' alignItems='start'>
        <Heading
          fontFamily={theme.fonts.spaceGrotesk}
          color={theme.colors.brand.black}
          fontSize={{ lg: '36px' }}
          mb='1rem'
        >
          Freedom is under attack. Creators are fighting back!
        </Heading>
        <Text
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
          mb='1rem'
        >
          We are a platform for artists to create NFTs in support of Ukraine
          helping:
        </Text>
        <UnorderedList
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
        >
          <ListItem>Break through Putin’s propaganda with their art</ListItem>
          <ListItem>
            Send all the NFT sale proceeds to the people of Ukraine
          </ListItem>
        </UnorderedList>
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
            Explore
          </StyledButton>
          <StyledButton
            onClick={() => (window.location.href = '')}
            minW={{ base: 'auto' }}
            fontSize={{ base: '16px', lg: '18px' }}
          >
            Mint
          </StyledButton>
        </Flex>
      </Flex>
      <Skeleton height='100%' w='100%' />
    </SimpleGrid>
  );
};
