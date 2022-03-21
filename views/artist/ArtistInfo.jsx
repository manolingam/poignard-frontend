import {
  Flex,
  Image as ChakraImage,
  Heading,
  Text,
  Box
} from '@chakra-ui/react';

import { theme } from '../../themes/theme';

export const ArtistInfo = ({ artist }) => {
  return (
    <Flex
      direction='column'
      pb='2rem'
      mb='1rem'
      alignItems='center'
      justifyContent='center'
    >
      <ChakraImage
        src={`https://avatars.dicebear.com/api/croodles-neutral/${artist.name}.svg`}
        alt={artist.name}
        w='100px'
        mb='1rem'
      ></ChakraImage>

      <Flex direction='row' mb='1rem'>
        <Heading
          fontFamily={theme.fonts.spaceGrotesk}
          color='rgb(32, 129, 226)'
        >
          {artist.name}{' '}
        </Heading>
        <Box h='15px' w='15px'>
          <span>
            <i className='fa-solid fa-circle-check'></i>
          </span>
        </Box>
      </Flex>
      {/* <Flex direction='row' mb='2rem'>
        <Box h='25px' w='25px' mr='1rem'>
          <span>
            <i className='fa-brands fa-twitter'></i>
          </span>
        </Box>
        <Box h='25px' w='25px'>
          <span>
            <i className='fa-brands fa-instagram'></i>
          </span>
        </Box>
      </Flex> */}
      <Text
        fontFamily={theme.fonts.spaceMono}
        color={theme.colors.brand.graniteGrey}
        maxW='60rem'
        textAlign='center'
      >
        {artist.bio}
      </Text>
    </Flex>
  );
};
