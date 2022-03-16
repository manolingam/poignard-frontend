import {
  Flex,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Link,
  Box
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
  font-weight: bold;
  font-size: 35px;
  padding-bottom: 1rem;
`;

const StyledTextTwo = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.blackCharcoal};
`;

const StyledTextThree = styled(Text)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.yellow};
  font-weight: bold;
  font-size: 35px;
  padding-bottom: 1rem;
`;

export const SocialProofs = () => {
  return (
    <Flex
      direction='column'
      px={{ base: '2rem', lg: '8rem' }}
      py={{ base: '2rem', lg: '6rem' }}
    >
      <StyledTextOne>Social Proofs</StyledTextOne>
      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} gridGap={20}>
        <Box
          minH='250px'
          w='100%'
          bgImage='/assets/unchain__banner.jpg'
          bgSize='cover'
          bgRepeat='no-repeat'
          bgPosition='center'
          mx='auto'
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
      <Flex
        direction='column'
        justifyContent='center'
        mt={{ base: '2rem', lg: '8rem' }}
      >
        <StyledTextThree>Partnerships!</StyledTextThree>
        <Link href='https://unchain.fund/' isExternal mx='auto'>
          <Image
            src='/assets/unchain__logo.jpg'
            alt='featured art'
            w={{ base: '300px' }}
          />
        </Link>
      </Flex>
    </Flex>
  );
};
