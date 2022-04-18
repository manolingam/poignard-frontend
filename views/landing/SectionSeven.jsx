import {
  Flex,
  SimpleGrid,
  Heading,
  Image as ChakraImage,
  Link
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';
import { logos } from '../../utils/constants';

const StyledHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.black};
  text-align: center;
  font-size: 35px;
  margin-bottom: 2rem;
`;

const partners = [
  { name: 'unchain', website: 'https://unchain.fund/' },
  { name: 'nfdao', website: 'https://nfdao.io/' },
  { name: 'giveth', website: 'https://giveth.io/' },
  { name: 'gitcoin', website: 'https://gitcoin.co/' },
  { name: 'everstake', website: 'https://everstake.one/' }
];

export const SectionSeven = () => {
  return (
    <Flex
      direction='column'
      px={{ base: '2rem', lg: '8rem' }}
      py={{ base: '2rem', lg: '4rem' }}
    >
      <StyledHeading>Supported by</StyledHeading>
      <SimpleGrid minChildWidth='50px' gridGap={10}>
        {partners.map((partner, index) => (
          <Link key={index} href={partner.website} isExternal mx='auto'>
            <ChakraImage
              src={logos[partner.name]}
              alt='partner logo'
              w={{ base: '300px' }}
            />
          </Link>
        ))}
      </SimpleGrid>
    </Flex>
  );
};
