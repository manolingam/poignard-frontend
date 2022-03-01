import { ChakraProvider, Flex } from '@chakra-ui/react';
import AppContextProvider from '../context/AppContext';

import { theme } from '../themes/theme';

export const Layout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <AppContextProvider>
        <Flex overflowX='hidden' background='white'>
          {children}
        </Flex>
      </AppContextProvider>
    </ChakraProvider>
  );
};
