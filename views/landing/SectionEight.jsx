import { Flex, Heading, Button, Text } from '@chakra-ui/react';

import { theme } from '../../themes/theme';
import { logos, illustrations } from '../../utils/constants';

export const SectionEight = () => {
  const downloadImage = async (imageSrc, name) => {
    const image = await fetch(imageSrc);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Flex
      direction='column'
      px={{ base: '2rem', lg: '8rem' }}
      py={{ base: '2rem', lg: '4rem' }}
      bg='#0057b7'
      alignItems='center'
    >
      <Heading
        fontFamily={theme.fonts.spaceGrotesk}
        color={theme.colors.brand.yellow}
      >
        Make Art! Stop War!
      </Heading>
      <Text
        fontFamily={theme.fonts.spaceGrotesk}
        color={theme.colors.brand.white}
        fontSize='20px'
        textAlign='center'
        mt='0.5rem'
      >
        Support us by using our social media banner!
      </Text>
      <Flex direction={{ base: 'column', lg: 'row' }} mt='1rem'>
        <Button
          fontFamily={theme.fonts.spaceMono}
          textTransform='uppercase'
          onClick={() =>
            downloadImage(illustrations.bannerPeace, 'peace banner')
          }
          mr={{ base: '0', lg: '1rem' }}
          mb={{ base: '1rem', lg: '0' }}
        >
          Download Banner
        </Button>
        <Button
          fontFamily={theme.fonts.spaceMono}
          textTransform='uppercase'
          onClick={() => downloadImage(logos.poignartMono, 'poignart logo')}
        >
          Download Logo
        </Button>
      </Flex>
    </Flex>
  );
};
