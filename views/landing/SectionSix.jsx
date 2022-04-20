import {
  Flex,
  VStack,
  Heading,
  Text,
  GridItem,
  Grid,
  Box
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';

import { theme } from '../../themes/theme';

import unchainBanner from '../../public/assets/logos/unchain_banner.webp';

const StyledHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.black};
  font-size: 35px;
  margin-bottom: 1rem;
`;

const StyledTextTwo = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.blackCharcoal};
`;

export const SectionSix = () => {
  return (
    <Flex
      direction='column'
      px={{ base: '2rem', lg: '8rem' }}
      py={{ base: '2rem', lg: '4rem' }}
      bg={theme.colors.brand.unchainBgGreen}
    >
      <Grid
        templateColumns={{ lg: 'repeat(3, 1fr)', base: 'repeat(1, 1fr)' }}
        gridGap={10}
        placeItems='center'
      >
        <GridItem>
          <Box w={{ lg: '300px', base: '250px' }}>
            <Image
              src={unchainBanner}
              alt='unchain banner'
              layout='responsive'
              placeholder='blur'
            />
          </Box>
        </GridItem>
        <GridItem colSpan={{ lg: 2 }}>
          <VStack spacing={5} justifyContent='center'>
            <StyledHeading>
              Unchain is already transferring funds to the people on the ground
              in Ukraine who need it most.
            </StyledHeading>
            <StyledTextTwo fontSize={{ base: '1rem', lg: '20px' }}>
              {`Helping Kharkiv & Sumy refugees in Poltava schools with diapers, food,
          baby food, flashlights, and more. Providing medicine via Ukraine's
          veteran's fund. Organizing laundry for refugees in Uzhgorod.
          PoignART's contributions will get more urgent needs met quicker and in
          more cities.`}
            </StyledTextTwo>
          </VStack>
        </GridItem>
      </Grid>
    </Flex>
  );
};
