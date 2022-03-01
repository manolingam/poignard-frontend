import {
  Flex,
  Link,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  SkeletonCircle
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '../themes/theme';

export const StyledFooterHeaderText = styled(Text)`
  font-family: ${theme.fonts.poppins};
  font-weight: bold;
  color: ${theme.colors.ukraine.yellow};
`;

export const Footer = () => {
  return (
    <Flex
      w='100%'
      direction={{ base: 'column-reverse', md: 'row', lg: 'row' }}
      alignItems='flex-start'
      justifyContent='space-between'
      bg={theme.colors.ukraine.azure}
      px={{ base: '2rem', lg: '5rem' }}
      py='2rem'
      mt='auto'
    >
      <SkeletonCircle size='10' mt='1rem' />

      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 3 }}
        spacing={{ base: '2rem', lg: '5rem' }}
        fontSize='1rem'
        color='azure'
      >
        <VStack alignItems='flex-start'>
          <StyledFooterHeaderText fontSize='1.2rem'>
            For Artists
          </StyledFooterHeaderText>
          <Link href=''>Submit art</Link>
          <Link href=''>Read manifesto</Link>
        </VStack>
        <VStack alignItems='flex-start'>
          <StyledFooterHeaderText fontSize='1.2rem'>
            For Supporters
          </StyledFooterHeaderText>
          <Link href=''>Mint NFT</Link>
          <Link href=''>View artworks</Link>
        </VStack>
        <VStack alignItems='flex-start'>
          <StyledFooterHeaderText fontSize='1.2rem'>
            For All
          </StyledFooterHeaderText>
          <Link>
            <HStack>
              <span style={{ width: '15px', marginRight: '5px' }}>
                <i className='fab fa-twitter'></i>
              </span>
              <Link
                href='https://twitter.com/Poignard6'
                target='_blank'
                rel='noopener noreferrer'
              >
                Twitter
              </Link>
            </HStack>
          </Link>

          <Link>
            <HStack>
              <span style={{ width: '15px', marginRight: '5px' }}>
                <i className='fab fa-discord'></i>
              </span>
              <Link href='' target='_blank' rel='noopener noreferrer'>
                Discord
              </Link>
            </HStack>
          </Link>

          <Link>
            <HStack>
              <span style={{ width: '15px', marginRight: '5px' }}>
                <i className='fas fa-newspaper'></i>
              </span>
              <Link
                href='https://medium.com/@poignard'
                target='_blank'
                rel='noopener noreferrer'
              >
                Newsletter
              </Link>
            </HStack>
          </Link>
        </VStack>
      </SimpleGrid>
    </Flex>
  );
};
