import {
  SimpleGrid,
  Flex,
  Text,
  Skeleton,
  Heading,
  UnorderedList,
  ListItem,
  Button
} from '@chakra-ui/react';
import styled from '@emotion/styled';

const StyledButton = styled(Button)`
  height: 50px;
  width: 100%;
  font-family: ${theme.fonts.spaceGrotesk};
  text-transform: uppercase;
  border: 2px solid ${theme.colors.brand.black};
  border-radius: 3px;
  color: ${theme.colors.brand.black};
  background: white;
  box-decoration-break: clone;
  padding-left: 24px;
  padding-right: 24px;
  &:hover {
    opacity: 0.6;
  }
`;

import { theme } from '../../themes/theme';

export const Explainer = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 1, lg: 2 }}
      gridGap={10}
      py='6rem'
      px={{ base: '2rem', lg: '8rem' }}
    >
      <Flex direction='column' justifyContent='flex-start'>
        <Heading
          fontFamily={theme.fonts.spaceGrotesk}
          color={theme.colors.brand.black}
          fontSize={{ lg: '36px' }}
          mb='1rem'
        >
          Why NFT’s?
        </Heading>
        <Text
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.brightGrey}
          fontSize={{ lg: '36px' }}
          mb='1rem'
        >
          Why not list elsewhere?
        </Text>
        <Text
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.brightGrey}
          fontSize={{ lg: '36px' }}
          mb='1rem'
        >
          Where will the money go?
        </Text>
        <Text
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.brightGrey}
          fontSize={{ lg: '36px' }}
          mb='1rem'
        >
          Can I just donate crypto?
        </Text>
        <Text
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.brightGrey}
          fontSize={{ lg: '36px' }}
          mb='1rem'
        >
          Who is behind this?
        </Text>
      </Flex>
      <Flex
        w='100%'
        direction='column'
        justifyContent={{ base: 'center', lg: 'flex-start' }}
      >
        <Text
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
          mb='1rem'
        >
          An NFT is a badge of honor, a badge of inclusivity. NFTs have become a
          representation of one’s online identity and real-life views. For many,
          showcasing an amazing NFT art that is also directly financing the
          needs of the Ukrainian people is a status symbol arguably much more
          prestigious than a lambo or a Picasso. When someone looks at your PFP,
          will they say “Oh, that’s a nice Ape” or “Oh – you helped UkrainWe?”,
          or maybe they will combine mainstream trends with contributing to
          greater good “Oh, your Ape holds a flag of Ukraine!”
        </Text>
        <Text
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
          mb='1rem'
        >
          NFTs are transparent, verifiable, and traceable. With NFTs, we can
          help artists make a name for themselves, collectors add a powerful
          status symbol, and the people of Ukraine get a bigger “check” out of
          people that they may get as a simple donation. Win-win-win.
        </Text>
        <Text
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
          mb='1rem'
        >
          And a cultural win too! Putin is terrified of art. He is terrified of
          freedom of expression. So let’s hit him with just that. Let’s show the
          people of Russia that they can artistically speak up to Putin while
          also helping Ukraine. Let’s show Putin that art cannot be silenced,
          that people cannot be silenced! And let’s show the world why NFTs are
          here to stay.
        </Text>
      </Flex>
    </SimpleGrid>
  );
};
