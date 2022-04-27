import { ChakraProvider, Flex } from '@chakra-ui/react';
import Script from 'next/script';
import AppContextProvider from '../context/AppContext';

import Router from 'next/router';
import nProgress from 'nprogress';

import { theme } from '../themes/theme';
import { GA_ID } from '../config';

import '../globals.css';
import '../nprogress.css';

Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <ChakraProvider theme={theme}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_ID}');
        `}
        </Script>
        <Flex overflowX='hidden' background='white' maxW='100rem' mx='auto'>
          <Component {...pageProps} />
        </Flex>
      </ChakraProvider>
    </AppContextProvider>
  );
}

export default MyApp;
