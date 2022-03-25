import { Box, useToast } from '@chakra-ui/react';

import { theme } from '../themes/theme';

const useWarnings = () => {
  const toast = useToast();

  const triggerToast = (message) => {
    toast({
      duration: 8000,
      position: 'top',
      render: () => (
        <Box
          color={theme.colors.brand.white}
          p={3}
          bg={theme.colors.brand.black}
          fontFamily={theme.fonts.spaceGrotesk}
          textAlign='center'
        >
          {message}
        </Box>
      )
    });
  };

  return { triggerToast };
};

export default useWarnings;
