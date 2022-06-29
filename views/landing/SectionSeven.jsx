import { Flex, SimpleGrid, Heading, Link } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';

import { theme } from '../../themes/theme';
import { logos } from '../../utils/constants';

const StyledHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.black};
  text-align: center;
  font-size: 35px;
  margin-bottom: 2rem;
`;

import unchain from '../../public/assets/logos/unchain.webp';
import nfdao from '../../public/assets/logos/nfdao.webp';
import giveth from '../../public/assets/logos/giveth.webp';
import gitcoin from '../../public/assets/logos/gitcoin.webp';
import everstake from '../../public/assets/logos/everstake.webp';

const partners = [
  { name: 'unchain', website: 'https://unchain.fund/', image: unchain },
  { name: 'nfdao', website: 'https://nfdao.io/', image: nfdao },
  { name: 'giveth', website: 'https://giveth.io/', image: giveth },
  { name: 'gitcoin', website: 'https://gitcoin.co/', image: gitcoin },
  { name: 'everstake', website: 'https://everstake.one/', image: everstake }
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
            <Image
              src={partner.image}
              alt='partner logo'
              width='300px'
              height='300px'
              placeholder='blur'
            />
          </Link>
        ))}
      </SimpleGrid>
    </Flex>
  );
};
