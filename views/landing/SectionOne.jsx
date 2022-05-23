import {
  Grid,
  GridItem,
  Flex,
  Text,
  Heading,
  Button,
  Link as ChakraLink
} from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';

import logoTorch from '../../public/assets/logos/logo_torch.webp';

const StyledButton = styled(Button)`
  height: 50px;
  text-transform: uppercase;
  border-radius: 3px;
  box-decoration-break: clone;
  padding-left: 24px;
  padding-right: 24px;
`;

const StyledHeading = styled(Heading)`
  color: ${theme.colors.brand.black};
  font-family: ${theme.fonts.spaceGrotesk};
  margin-bottom: 2rem;
  font-size: 45px;
`;

const StyledText = styled(Text)`
  color: ${theme.colors.brand.graniteGrey};
  font-size: 20px;
`;

export const SectionOne = ({ unchainIncome }) => {
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css'
        />
      </Head>
      <Grid
        templateColumns={{ lg: 'repeat(3, 1fr)', base: 'repeat(1, 1fr)' }}
        gridGap={20}
        placeItems='center'
        px={{ base: '2rem', lg: '8rem' }}
        py={{ base: '2rem', lg: '6rem' }}
      >
        <GridItem colSpan={{ lg: 2 }}>
          <Flex direction='column' alignItems='start' justifyContent='center'>
            <StyledHeading>
              Freedom is under attack. <br /> Creators are fighting back!
            </StyledHeading>
            <StyledText mb='1rem'>
              We help artists create non-fungible tokens (NFT) to support
              Ukraine. 100% of proceeds go to rapid humanitarian aid through{' '}
              <ChakraLink
                textDecoration='underline'
                href='https://unchain.fund/'
                isExternal
                color={theme.colors.brand.unchainFontGreen}
                fontWeight='bold'
              >
                Unchain.fund
              </ChakraLink>
              . Over {unchainIncome} has been raised to date.
            </StyledText>
            <Flex
              w='100%'
              mt={{ base: '2rem' }}
              direction='row'
              justifyContent={{ base: 'center', lg: 'flex-start' }}
            >
              <Link href='#section-three' passHref>
                <StyledButton
                  minW={{ base: 'auto' }}
                  fontSize={{ base: '16px', lg: '18px' }}
                  mr='1rem'
                  background={theme.colors.brand.blue}
                  color={theme.colors.brand.white}
                  _hover={{
                    opacity: 0.7
                  }}
                >
                  Explore
                </StyledButton>
              </Link>
              <Link href='#section-two' passHref>
                <StyledButton
                  minW={{ base: 'auto' }}
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={theme.colors.brand.white}
                  bg={theme.colors.brand.yellow}
                  _hover={{
                    opacity: 0.7
                  }}
                >
                  Donate
                </StyledButton>
              </Link>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem
          borderRadius='10px'
          boxShadow='inset 7px 7px 16px #c2c2c2,
             inset -7px -7px 16px #ffffff'
          backgroundColor='#EEEEEE'
        >
          <Image
            src={logoTorch}
            alt='poignart torch'
            placeholder='blur'
            w='300px'
            h='auto'
          />
        </GridItem>
      </Grid>
    </>
  );
};
