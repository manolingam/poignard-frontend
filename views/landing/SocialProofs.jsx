import {
  Flex,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Skeleton
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';

const StyledHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.black};
  font-size: 35px;
  margin-bottom: 1rem;
`;

const StyledTextOne = styled(Text)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.yellow};
  position: absolute;
  font-weight: bold;
  font-size: 35px;
  padding: 1rem;
`;

const StyledTextTwo = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.blackCharcoal};
`;

const StyledTextThree = styled(Text)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.yellow};
  position: absolute;
  font-weight: bold;
  font-size: 35px;
  padding: 1rem;
`;

export const SocialProofs = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 1, lg: 2 }}
      gridGap={20}
      px={{ base: '2rem', lg: '8rem' }}
      py={{ base: '2rem', lg: '6rem' }}
    >
      <Flex w='100%' position='relative'>
        <Skeleton h={{ base: '200px', lg: '100%' }} w='100%' />
        <StyledTextOne>Social Proofs</StyledTextOne>
      </Flex>

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

      <Flex minH='40vh' mt={{ base: '2rem', lg: '8rem' }}>
        <StyledTextThree>Partnerships!</StyledTextThree>
      </Flex>
    </SimpleGrid>
  );
};
