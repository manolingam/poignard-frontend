import {
  Flex,
  Heading,
  SimpleGrid,
  HStack,
  Text,
  Link as ChakraLink,
  Box
} from '@chakra-ui/react';
import Image from 'next/image';
import styled from '@emotion/styled';

import inna from '../../public/assets/team/inna.webp';
import dahveed from '../../public/assets/team/dahveed.webp';
import seroga from '../../public/assets/team/seroga.webp';
import kyle from '../../public/assets/team/kyle.webp';
import saimano from '../../public/assets/team/saimano.webp';
import dan from '../../public/assets/team/dan.webp';
import chad from '../../public/assets/team/chad.webp';
import maryna from '../../public/assets/team/maryna.webp';
import bestape from '../../public/assets/team/bestape.webp';
import luke from '../../public/assets/team/luke.webp';

import { theme } from '../../themes/theme';

import { teamInfo } from '../../utils/constants';

const teamPics = {
  Inna: inna,
  Dahveed: dahveed,
  Seroga: seroga,
  Kyle: kyle,
  Saimano: saimano,
  Dan: dan,
  Chad: chad,
  Maryna: maryna,
  'Kyle aka Bestape': bestape,
  Luke: luke
};

const StyledHeading = styled(Heading)`
  color: ${theme.colors.brand.unchainFontGreen};
  font-family: ${theme.fonts.spaceGrotesk};
  text-align: center;
  font-size: 35px;
  margin-bottom: 1rem;
`;

const StyledBodyText = styled(Text)`
  color: ${theme.colors.brand.white};
  text-align: center;
  font-size: 20px;
  margin-bottom: 4rem;
`;

const StyledText = styled(Text)`
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
            <Box
              borderRadius='50%'
              width='150px'
              height='150px'
              overflow='hidden'
            >
              <Image
                src={teamPics[info.name]}
                placeholder='blur'
                width='150px'
                height='150px'
                objectFit='cover'
                alt='featured art'
              />
            </Box>
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
                  <span>
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
