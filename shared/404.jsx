import { Flex } from '@chakra-ui/react';
import { Text, Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';

import { theme } from '../themes/theme';

import logoTorch from '../public/assets/logos/logo_torch.webp';

const StyledButton = styled(Button)`
  height: 50px;
  width: 100%;
  font-family: ${theme.fonts.spaceGrotesk};
  text-transform: uppercase;
  border: 2px solid ${theme.colors.brand.black};
  border-radius: 3px;
  box-decoration-break: clone;
  padding-left: 24px;
  padding-right: 24px;
  &:hover {
    opacity: 0.6;
  }
`;

export const Page404 = () => {
  return (
    <Flex
      minH='100vh'
      w='100%'
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      <Image src={logoTorch} alt='404' h='250px' w='250px' />
      <Text
        fontWeight='bold'
        fontSize='24px'
        fontFamily={theme.fonts.spaceGrotesk}
      >
        Page not found
      </Text>
      <Flex direction={{ lg: 'row', base: 'column' }} mt='2rem'>
        <Link href='/' passHref>
          <StyledButton
            mr={{ lg: '1rem', base: '0' }}
            mb={{ lg: '0', base: '1rem' }}
          >
            Back Home
          </StyledButton>
        </Link>
        <Link href='/explore' passHref>
          <StyledButton>Explore Art</StyledButton>
        </Link>
      </Flex>
    </Flex>
  );
};
