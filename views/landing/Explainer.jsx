import { useState, useEffect } from 'react';
import { SimpleGrid, Flex, Text, Heading } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { explainerQA } from '../../utils/constants';
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

const explainerQ = [
  'Why NFTs?',
  'Why not list elsewhere?',
  'Where will the money go?',
  'Can I just donate crypto?',
  'Who is behind this?'
];

export const Explainer = () => {
  const [previousQuestion, setPreviousQuestion] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(explainerQ[0]);

  useEffect(() => {
    if (previousQuestion) {
      document.getElementById(previousQuestion).style.color =
        theme.colors.brand.chineseSilver;
    }

    document.getElementById(currentQuestion).style.color =
      theme.colors.brand.darkCharcoal;
  }, [currentQuestion, previousQuestion]);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 1, lg: 2 }}
      gridGap={10}
      px={{ base: '2rem', lg: '8rem' }}
      py={{ base: '2rem', lg: '6rem' }}
    >
      <Flex direction='column' justifyContent='flex-start' fontSize='35px'>
        {explainerQ.map((q, index) => {
          return (
            <StyledTextChineseSilver
              id={q}
              key={index}
              cursor='pointer'
              _hover={{ color: theme.colors.brand.darkCharcoal }}
              onClick={() => {
                setPreviousQuestion(currentQuestion);
                setCurrentQuestion(q);
              }}
            >
              {q}
            </StyledTextChineseSilver>
          );
        })}
      </Flex>
      <Flex
        w='100%'
        direction='column'
        justifyContent={{ base: 'center', lg: 'flex-start' }}
        fontSize='20px'
      >
        {currentQuestion !== explainerQ[0] && (
          <StyledTextBlackCharcoal>
            {explainerQA[currentQuestion]}
          </StyledTextBlackCharcoal>
        )}
        {currentQuestion == explainerQ[0] && (
          <>
            <StyledTextBlackCharcoal>
              An NFT is a badge of honor, a badge of inclusivity. NFTs have
              become a representation of one’s online identity and real-life
              views. For many, showcasing an amazing NFT art that is also
              directly supporting the needs of the Ukrainian people is a status
              symbol arguably much more prestigious than a lambo or a Picasso.
            </StyledTextBlackCharcoal>
            <StyledTextBlackCharcoal>
              NFTs are transparent, verifiable, and traceable. With NFTs, we can
              help artists make a name for themselves, collectors add a powerful
              status symbol, and the people of Ukraine get the help they so
              desperately need. Win-win-win!
            </StyledTextBlackCharcoal>
            <StyledTextBlackCharcoal>
              What a powerful cultural win! Putin is terrified of freedom of
              speeach and expression. So let’s hit him with just that - freedom
              of expression through art. Let’s show the people of Russia that
              they can artistically speak up to Putin’s regime while also
              helping Ukraine. Let’s show Putin that art cannot be silenced,
              that people cannot be silenced! NFTs are here to stay and make in
              impact to the world!
            </StyledTextBlackCharcoal>
          </>
        )}
      </Flex>
    </SimpleGrid>
  );
};
