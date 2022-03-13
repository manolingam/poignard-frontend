import {
  SimpleGrid,
  Flex,
  Text,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { whyNfts } from '../../utils/constants';
import { theme } from '../../themes/theme';

const StyledHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.black};
  margin-bottom: 1rem;
`;

const StyledTextChineseSilver = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.chineseSilver};
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
        {whyNfts.map((whyNft, index) => {
          return (
            <Popover key={index}>
              <PopoverTrigger>
                <StyledTextChineseSilver
                  cursor='pointer'
                  _hover={{ color: theme.colors.brand.darkCharcoal }}
                >
                  {whyNft.q}
                </StyledTextChineseSilver>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />

                <PopoverBody fontSize='24px'>{whyNft.a}</PopoverBody>
              </PopoverContent>
            </Popover>
          );
        })}
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
          What a powerful cultural win! Putin is terrified of freedom of speeach
          and expression. So let’s hit him with just that - freedom of
          expression through art. Let’s show the people of Russia that they can
          artistically speak up to Putin’s regime while also helping Ukraine.
          Let’s show Putin that art cannot be silenced, that people cannot be
          silenced! NFTs are here to stay and make in impact to the world!
        </StyledTextBlackCharcoal>
      </Flex>
    </SimpleGrid>
  );
};
