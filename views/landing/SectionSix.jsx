import {
  Flex,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Box,
  Image as ChakraImage
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';
import { illustrations } from '../../utils/constants';

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
      <SimpleGrid
        columns={{ base: 1, md: 1, lg: 2 }}
        gridGap={10}
        placeItems='center'
      >
        <ChakraImage
          src={illustrations.unchain}
          w={{ lg: '300px', base: '250px' }}
        />

        <VStack spacing={5} justifyContent='center'>
          <StyledHeading>
            Unchain is already transferring funds to the people on the ground in
            Ukraine who need it most.
          </StyledHeading>
          <StyledTextTwo fontSize={{ base: '1rem', lg: '20px' }}>
            {`Helping Kharkiv & Sumy refugees in Poltava schools with diapers, food,
          baby food, flashlights, and more. Providing medicine via Ukraine's
          veteran's fund. Organizing laundry for refugees in Uzhgorod.
          PoignART's contributions will get more urgent needs met quicker and in
          more cities.`}
          </StyledTextTwo>
        </VStack>
      </SimpleGrid>
    </Flex>
  );
};
