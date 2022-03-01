import {
  Button,
  Flex,
  Link as ChakraLink,
  Text,
  SkeletonCircle
} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import styled from '@emotion/styled';

import { AppContext } from '../context/AppContext';
import { navItems } from '../utils/constants';
import { getAccountString } from '../utils/helpers';
import { useWallet } from '../hooks/useWallet';

import { StyledPrimaryButton } from '../themes/buttons';
import { theme } from '../themes/theme';

const StyledButton = styled(Button)`
  &::after {
    box-sizing: inherit;
    transition: all ease-in-out 0.2s;
    background: none repeat scroll 0 0 ${theme.colors.ukraine.azure};
    content: '';
    display: block;
    height: 2px;
    width: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    font-family: ${theme.fonts.poppins};
  }
  &:hover {
    text-decoration: none;
    ::after {
      width: 100%;
    }
  }
`;

export const NavButton = ({ onClick, children }) => (
  <StyledButton
    onClick={onClick}
    transition='all 0.5s ease 0.4s'
    my='1rem'
    variant='link'
    fontWeight='normal'
    fontSize='1.5rem'
  >
    {children}
  </StyledButton>
);

export const Header = ({ windowWidth, navLinks = true }) => {
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
      <SkeletonCircle size='10' />

      {!navLinks && !context.signerAddress && (
        <StyledPrimaryButton onClick={connectWallet}>
          CONNECT
        </StyledPrimaryButton>
      )}

      {!navLinks && context.signerAddress && (
        <Text px={2} display={{ base: 'none', md: 'flex' }}>
          {getAccountString(context.signerAddress)}
        </Text>
      )}

      {windowWidth > 600 && navLinks && (
        <Flex
          minWidth='50%'
          direction='row'
          justifyContent='space-around'
          fontSize='1.3rem'
          color={theme.colors.ukraine.azure}
        >
          {navItems.map((item, index) => {
            return (
              <StyledButton
                key={index}
                onClick={() => {
                  onOpen((o) => !o);
                  document.location.href = item.href;
                }}
                my='1rem'
                variant='link'
                color={`${theme.colors.red}`}
                fontWeight='normal'
                fontSize='1.5rem'
              >
                <ChakraLink href={item.href}>{item.name}</ChakraLink>
              </StyledButton>
            );
          })}
        </Flex>
      )}

      {windowWidth < 600 && navLinks && (
        <>
          <Flex align='center' height='8rem'>
            <Button
              fontSize='2rem'
              onClick={() => onOpen((o) => !o)}
              variant='link'
              ml={{ base: '0.5rem', sm: '1rem' }}
              zIndex={7}
            >
              {!isOpen && (
                <span
                  style={{ width: '25px', color: theme.colors.ukraine.azure }}
                >
                  <i className='fas fa-bars' />
                </span>
              )}
              {isOpen && (
                <span
                  style={{ width: '25px', color: theme.colors.ukraine.yellow }}
                >
                  <i className='fas fa-times' />
                </span>
              )}
            </Button>
          </Flex>
          <Flex
            h='100%'
            w='100%'
            direction='column'
            justify='center'
            align='center'
            zIndex={6}
            position='fixed'
            left='0'
            top='0'
            bg={theme.colors.ukraine.azure}
            transition='all .8s ease-out'
            pointerEvents={isOpen ? 'all' : 'none'}
            css={{
              clipPath: isOpen
                ? 'circle(calc(100vw + 100vh) at 90% -10%)'
                : 'circle(100px at 90% -20%)'
            }}
          >
            {navItems.map((item, index) => {
              return (
                <StyledButton
                  key={index}
                  onClick={() => {
                    onOpen((o) => !o);
                    document.location.href = item.href;
                  }}
                  my='1rem'
                  variant='link'
                  color={`${theme.colors.ukraine.yellow}`}
                  fontWeight='normal'
                  fontSize='1.5rem'
                >
                  {item.name}
                </StyledButton>
              );
            })}

            <ChakraLink
              href='https://discord.gg/CanD2WcK7W'
              isExternal
              _hover={{}}
            ></ChakraLink>
          </Flex>
        </>
      )}
    </Flex>
  );
};
