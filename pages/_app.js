import { ChakraProvider, Flex } from '@chakra-ui/react';
import AppContextProvider from '../context/AppContext';

import Router from 'next/router';
import nProgress from 'nprogress';

import { theme } from '../themes/theme';
import '../globals.css';
import '../nprogress.css';

Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

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
