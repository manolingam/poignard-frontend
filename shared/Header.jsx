import {
  Button,
  Flex,
  Text,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@chakra-ui/react';
import { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import { AppContext } from '../context/AppContext';
import { logos, navItems } from '../utils/constants';
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
  const { connectWallet, disconnect, signaturePending } = useWallet();

  return (
    <Flex
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      px={{ base: '2rem', lg: '5rem' }}
      py={{ base: '1rem', lg: '2rem' }}
      w='100%'
    >
      <Link href='/' passHref>
        <Flex
          direction='row'
          alignItems='center'
          justifyContent='center'
          cursor='pointer'
        >
          <Image src={logos.poignartMono} alt='logo' mr='5px' w='75px' />
          {windowWidth > 700 && (
            <Image src={logos.poignartFull} alt='logo' w='125px' />
          )}
        </Flex>
      </Link>

      <Flex
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        fontSize={{ base: '1rem', lg: '1.3rem' }}
      >
        {windowWidth > 600 &&
          window.location.pathname !== '/submit' &&
          window.location.pathname !== '/explore' &&
          navItems.map((item, index) => {
            return (
              <Link href={`/${item.name.toLowerCase()}`} passHref key={index}>
                <Text
                  fontFamily={theme.fonts.spaceGrotesk}
                  color={theme.colors.brand.black}
                  fontWeight='bold'
                  mr='4rem'
                  cursor='pointer'
                  _hover={{ textDecoration: 'underline' }}
                >
                  {item.name}
                </Text>
              </Link>
            );
          })}

        {windowWidth > 600 && window.location.pathname === '/submit' && (
          <Link href='/explore' passHref>
            <Text
              fontFamily={theme.fonts.spaceGrotesk}
              color={theme.colors.brand.black}
              fontWeight='bold'
              mr='4rem'
              cursor='pointer'
              _hover={{ textDecoration: 'underline' }}
            >
              Explore
            </Text>
          </Link>
        )}

        {windowWidth > 600 && window.location.pathname === '/explore' && (
          <Link href='/submit' passHref>
            <Text
              fontFamily={theme.fonts.spaceGrotesk}
              color={theme.colors.brand.black}
              fontWeight='bold'
              mr='4rem'
              cursor='pointer'
              _hover={{ textDecoration: 'underline' }}
            >
              Submit
            </Text>
          </Link>
        )}

        {!context.signature ? (
          <StyledConnectButton
            onClick={connectWallet}
            isLoading={signaturePending}
            loadingText='Signature Pending'
          >
            CONNECT
          </StyledConnectButton>
        ) : (
          <Flex justify='center' align='center' zIndex={5}>
            <Popover placement='bottom'>
              <PopoverTrigger>
                <Button
                  fontWeight='normal'
                  bg={theme.colors.brand.yellow}
                  p={{ base: 0, md: 3 }}
                >
                  <Text
                    px={2}
                    fontFamily={theme.fonts.spaceGrotesk}
                    color={theme.colors.brand.black}
                  >
                    {getAccountString(context.signerAddress)}
                  </Text>
                </Button>
              </PopoverTrigger>
              <PopoverContent bg='none' w='auto'>
                <Button
                  onClick={() => {
                    disconnect();
                    window.location.reload();
                  }}
                  fontFamily={theme.fonts.spaceGrotesk}
                >
                  Disconnect
                </Button>
                {context.db_artist && (
                  <Link href={`/artist/${context.signerAddress}`} passHref>
                    <Button fontFamily={theme.fonts.spaceGrotesk}>
                      Profile
                    </Button>
                  </Link>
                )}
              </PopoverContent>
            </Popover>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
