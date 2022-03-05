import {
  Flex,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Skeleton
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';

const StyledBodyText = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.blackCharcoal};
`;

export const SocialProofs = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 1, lg: 2 }}
      gridGap={10}
      px={{ base: '2rem', lg: '8rem' }}
      py='6rem'
    >
      <Flex h='100%' w='100%' position='relative'>
        <Skeleton height='100%' w='100%' />
        <Text
          fontFamily={theme.fonts.spaceGrotesk}
          color={theme.colors.brand.yellow}
          position='absolute'
          fontWeight='bold'
          fontSize={{ lg: '50px' }}
          p='1rem'
        >
          Social Proofs
        </Text>
      </Flex>

      <VStack spacing={5} justifyContent='center'>
        <Heading
          fontFamily={theme.fonts.spaceGrotesk}
          color={theme.colors.brand.black}
          fontSize={{ lg: '24px' }}
          mb='1rem'
          mr='4rem'
        >
          “We develop actionable blockchain strategies, while supporting your
          team through the necessary steps for growing your operation.”
        </Heading>
        <StyledBodyText fontSize={{ base: '1rem', lg: '18px' }} ml='4rem'>
          “With our extensive advisory experience and connections in the tech
          and venture capital industries, we focus on developing synergetic
          long-term partnerships” - xxx
        </StyledBodyText>
      </VStack>
    </SimpleGrid>
  );
};
