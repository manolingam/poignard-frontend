import {
  Flex,
  Heading,
  SimpleGrid,
  Text,
  HStack,
  Link as ChakraLink,
  Image as ChakraImage
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';

import { teamInfo } from '../../utils/constants';

const StyledHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.unchainFontGreen};
  text-align: center;
  font-size: 35px;
  margin-bottom: 1rem;
`;

const StyledBodyText = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.white};
  text-align: center;
  font-size: 20px;
  margin-bottom: 4rem;
`;

const StyledText = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.white};
  font-size: 14px;
`;

export const SectionFive = () => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      px={{ base: '2rem', lg: '8rem' }}
      py={{ base: '2rem', lg: '6rem' }}
      bg={theme.colors.brand.unchainBgBlack}
    >
      <StyledHeading>Who is on your team?</StyledHeading>
      <StyledBodyText>
        Our team is a group of volunteers in the Web3 world including leaders
        from ETHDenver, Berkeley Blockchain Xcelerator, RaidGuild, Opolis,
        Cryptokitties, Cipher Media, MetaGame, Unchain, Gitcoin, KERNEL, LexDAO,
        and more! Please do not tag nor credit us individually. All public
        attention and praise must go to the cause!
      </StyledBodyText>
      <SimpleGrid
        w='100%'
        columns={{ lg: 3, base: 1 }}
        px='2rem'
        gridGap={10}
        placeItems='center'
      >
        {teamInfo.map((info, index) => (
          <Flex
            key={index}
            direction='column'
            justifyContent='center'
            alignItems='left'
          >
            <ChakraImage
              src={info.image}
              h='150px'
              w='150px'
              objectFit='contain'
              filter='grayscale(100%)'
            />

            <HStack color={theme.colors.brand.yellow} mt='1rem'>
              <span style={{ width: '15px', marginRight: '1px' }}>
                <i className='fab fa-twitter'></i>
              </span>
              <ChakraLink href={info.twitter} isExternal>
                {info.name}
              </ChakraLink>
            </HStack>
            <StyledText>{info.role}</StyledText>
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  );
};
