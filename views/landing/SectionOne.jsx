import {
  Grid,
  GridItem,
  Flex,
  Text,
  Image,
  Heading,
  Button,
  Link as ChakraLink
} from '@chakra-ui/react';
import Link from 'next/link';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';
import { logos } from '../../utils/constants';

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

const StyledHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.black};
  margin-bottom: 2rem;
  font-size: 35px;
`;

const StyledText = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.darkCharcoal};
  font-size: 20px;
`;

export const SectionOne = ({ unchainIncome }) => {
  return (
    <Grid
      templateColumns={{ lg: 'repeat(3, 1fr)', base: 'repeat(1, 1fr)' }}
      gridGap={20}
      px={{ base: '2rem', lg: '8rem' }}
      py={{ base: '2rem', lg: '4rem' }}
    >
      <GridItem colSpan={{ lg: 2 }}>
        <Flex direction='column' alignItems='start' justifyContent='center'>
          <StyledHeading>
            Freedom is under attack. <br /> Creators are fighting back!
          </StyledHeading>
          <StyledText mb='1rem'>
            We help artists create non-fungible tokens (NFT) to support Ukraine.
            100% of proceeds go to rapid humanitarian aid through{' '}
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
              >
                Explore Art
              </StyledButton>
            </Link>
            <Link href='#section-two' passHref>
              <StyledButton
                minW={{ base: 'auto' }}
                fontSize={{ base: '16px', lg: '18px' }}
              >
                Donate Art
              </StyledButton>
            </Link>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem>
        <Image
          src={logos.poignartMono}
          alt='machine art'
          w='300px'
          h='auto'
          mr={{ base: 'auto' }}
          ml={{ base: 'auto' }}
        />
      </GridItem>
    </Grid>
  );
};
