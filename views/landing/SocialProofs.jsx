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
import { illustrations, logos } from '../../utils/constants';

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

const partners = [
  { name: 'unchain', website: 'https://unchain.fund/' },
  { name: 'nfdao', website: 'https://nfdao.io/' },
  { name: 'giveth', website: 'https://giveth.io/' },
  { name: 'gitcoin', website: 'https://gitcoin.co/' }
];

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
          bgImage={illustrations.unchain}
          bgSize='contain'
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
        <StyledTextThree>Partnerships</StyledTextThree>
        <SimpleGrid minChildWidth='50px' gridGap={20}>
          {partners.map((partner, index) => (
            <Link key={index} href={partner.website} isExternal mx='auto'>
              <Image
                src={logos[partner.name]}
                alt='partner logo'
                w={{ base: '300px' }}
              />
            </Link>
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};
