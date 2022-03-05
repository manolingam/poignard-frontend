import {
  Button,
  Flex,
  Link as ChakraLink,
  Text,
  Image
} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import styled from '@emotion/styled';

import { AppContext } from '../context/AppContext';
import { navItems } from '../utils/constants';
import { getAccountString } from '../utils/helpers';
import { useWallet } from '../hooks/useWallet';

import { theme } from '../themes/theme';

const StyledConnectButton = styled(Button)`
  min-width: 160px;
  height: 50px;
  font-family: ${theme.fonts.spaceGrotesk};
  text-transform: uppercase;
  color: ${theme.colors.brand.black};
  border-radius: 2px;
  background-color: ${theme.colors.brand.yellow};
  padding-left: 24px;
  padding-right: 24px;
  &:hover {
    opacity: 0.7;
  }
`;

export const Header = ({ windowWidth }) => {
  const context = useContext(AppContext);
  const { connectWallet } = useWallet();
  const [isOpen, onOpen] = useState(false);

  return (
    <Flex
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      px={{ base: '2rem', lg: '5rem' }}
      py='2rem'
      w='100%'
    >
      <Image
        src='/assets/logo.png'
        alt='logo'
        w={{ lg: '250px', md: '200px', base: '100px' }}
      />

      {windowWidth > 600 && (
        <Flex
          minWidth='50%'
          direction='row'
          justifyContent='space-around'
          alignItems='center'
          fontSize='1.3rem'
          color={theme.colors.ukraine.azure}
        >
          {navItems.map((item, index) => {
            return (
              <ChakraLink
                fontFamily={theme.fonts.spaceGrotesk}
                color={theme.colors.brand.black}
                fontWeight='bold'
                key={index}
                href={item.href}
              >
                {item.name}
              </ChakraLink>
            );
          })}
          {!context.signerAddress ? (
            <StyledConnectButton onClick={connectWallet}>
              CONNECT
            </StyledConnectButton>
          ) : (
            <Text px={2} display={{ base: 'none', md: 'flex' }}>
              {getAccountString(context.signerAddress)}
            </Text>
          )}
        </Flex>
      )}
    </Flex>
  );
};
