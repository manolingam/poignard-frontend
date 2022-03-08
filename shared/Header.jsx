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
      py={{ base: '1rem', lg: '2rem' }}
      w='100%'
    >
      <Flex direction='row' alignItems='center' justifyContent='center'>
        {windowWidth > 600 && <Image src='/assets/logo__text.png' alt='logo' />}
        <Image src='/assets/logo__mono.png' alt='logo' mr='5px' />
      </Flex>

      <Flex
        minWidth='50%'
        direction='row'
        justifyContent='space-around'
        alignItems='center'
        fontSize={{ base: '1rem', lg: '1.3rem' }}
      >
        {windowWidth > 600 &&
          navItems.map((item, index) => {
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
    </Flex>
  );
};
