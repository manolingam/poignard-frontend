import { ChakraProvider, Flex } from '@chakra-ui/react';
import AppContextProvider from '../context/AppContext';

import { theme } from '../themes/theme';
import '../globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <ChakraProvider theme={theme}>
        <Flex overflowX='hidden' background='white'>
          <Component {...pageProps} />
        </Flex>
      </ChakraProvider>
    </AppContextProvider>
  );
}

export default MyApp;
