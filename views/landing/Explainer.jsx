import { SimpleGrid, Flex, Text, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';

const StyledHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.black};
  margin-bottom: 1rem;
`;

const StyledTextBrightGrey = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.brightGrey};
  margin-bottom: 1rem;
`;

const StyledTextBlackCharcoal = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.blackCharcoal};
  margin-bottom: 1rem;
`;

export const Explainer = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 1, lg: 2 }}
      gridGap={10}
      px={{ base: '2rem', lg: '8rem' }}
      py={{ base: '2rem', lg: '6rem' }}
    >
      <Flex direction='column' justifyContent='flex-start' fontSize='35px'>
        <StyledHeading>Why NFT’s?</StyledHeading>
        <StyledTextBrightGrey>Why not list elsewhere?</StyledTextBrightGrey>
        <StyledTextBrightGrey>Where will the money go?</StyledTextBrightGrey>
        <StyledTextBrightGrey>Can I just donate crypto?</StyledTextBrightGrey>
        <StyledTextBrightGrey>Who is behind this?</StyledTextBrightGrey>
      </Flex>
      <Flex
        w='100%'
        direction='column'
        justifyContent={{ base: 'center', lg: 'flex-start' }}
        fontSize='20px'
      >
        <StyledTextBlackCharcoal>
          An NFT is a badge of honor, a badge of inclusivity. NFTs have become a
          representation of one’s online identity and real-life views. For many,
          showcasing an amazing NFT art that is also directly supporting the
          needs of the Ukrainian people is a status symbol arguably much more
          prestigious than a lambo or a Picasso.
        </StyledTextBlackCharcoal>
        <StyledTextBlackCharcoal>
          NFTs are transparent, verifiable, and traceable. With NFTs, we can
          help artists make a name for themselves, collectors add a powerful
          status symbol, and the people of Ukraine get the help they so
          desperately need. Win-win-win!
        </StyledTextBlackCharcoal>
        <StyledTextBlackCharcoal>
          And what a powerful cultural win too! Putin is terrified of art. He is
          terrified of freedom of expression. So let’s hit him with just that.
          Let’s show the people of Russia that they can artistically speak up to
          Putin’s regime while also helping Ukraine. Let’s show Putin that art
          cannot be silenced, that people cannot be silenced! And let’s show the
          world why NFTs are here to stay.
        </StyledTextBlackCharcoal>
      </Flex>
    </SimpleGrid>
  );
};
