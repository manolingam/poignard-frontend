import { Flex, Button, Text } from '@chakra-ui/react';

import { theme } from '../../themes/theme';
import { logos, illustrations, assetsLink } from '../../utils/constants';

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
      py={{ base: '2rem', lg: '2rem' }}
      alignItems='center'
    >
      <Text color={theme.colors.brand.black} fontSize='20px' textAlign='center'>
        Support us by using our social media banner & logo!
      </Text>
      <Flex direction={{ base: 'column', lg: 'row' }} mt='1rem'>
        <Button
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
          textTransform='uppercase'
          onClick={() => downloadImage(logos.poignartMono, 'poignart logo')}
          mr={{ base: '0', lg: '1rem' }}
          mb={{ base: '1rem', lg: '0' }}
        >
          Download Logo
        </Button>
        <Button
          textTransform='uppercase'
          onClick={() => window.open(assetsLink, '_blank')}
        >
          More Assets
        </Button>
      </Flex>
    </Flex>
  );
};
