import {
  Flex,
  Heading,
  SimpleGrid,
  HStack,
  Text,
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
      py={{ base: '2rem', lg: '4rem' }}
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
            alignItems='center'
          >
            <ChakraImage
              src={info.image}
              h='150px'
              w='150px'
              borderRadius='50%'
              objectFit='cover'
              filter='grayscale(50%)'
            />

            <Text mt='1rem' color={theme.colors.brand.yellow}>
              {info.name}
            </Text>
            <StyledText>{info.role}</StyledText>
            <HStack mt='.5rem'>
              {info.socials.twitter && (
                <ChakraLink
                  href={info.socials.twitter}
                  isExternal
                  color={theme.colors.brand.yellow}
                  fontSize='15px'
                  w='15px'
                  h='15px'
                >
                  <span>
                    <i className='fab fa-twitter'></i>
                  </span>
                </ChakraLink>
              )}
              {info.socials.linkedin && (
                <ChakraLink
                  href={info.socials.linkedin}
                  isExternal
                  color={theme.colors.brand.yellow}
                  fontSize='15px'
                  w='15px'
                  h='15px'
                >
                  <span style={{ marginLeft: '5px' }}>
                    <i className='fa-brands fa-linkedin'></i>
                  </span>
                </ChakraLink>
              )}
            </HStack>
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  );
};
