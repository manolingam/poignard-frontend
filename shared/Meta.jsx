import Head from 'next/head';
import Script from 'next/script';

import { logos } from '../utils/constants';

export const Meta = ({ title, description, image, url }) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - PoignART` : 'PoignART'}</title>
        <meta
          name='description'
          content={
            description
              ? description
              : 'A platform for artists to create NFTs in support of Ukraine: all proceeds go to Unchain Fund.'
          }
        />
        {title && <meta property='og:title' content={title} />}
        <meta
          property='og:description'
          content={
            description
              ? description
              : 'A platform for artists to create NFTs in support of Ukraine: all proceeds go to Unchain Fund.'
          }
        />
        <meta property='og:image' content={image || logos.poignartMono} />
        {url && <meta property='og:url' content={url} />}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content={title ? `${title} - PoignART` : 'PoignART'}
        />
        <meta
          name='twitter:description'
          content={
            description
              ? description
              : 'A platform for artists to create NFTs in support of Ukraine: all proceeds go to Unchain Fund.'
          }
        />
        <meta name='twitter:image' content={image || logos.poignartMono} />
        <meta property='og:type' content='website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* <Script
        src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/js/all.min.js'
        integrity='sha512-YSdqvJoZr83hj76AIVdOcvLWYMWzy6sJyIMic2aQz5kh2bPTd9dzY3NtdeEAzPp/PhgZqr4aJObB3ym/vsItMg=='
        crossOrigin='anonymous'
        strategy='afterInteractive'
      ></Script> */}
      <Script
        src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/js/all.min.js'
        integrity='sha512-Cvxz1E4gCrYKQfz6Ne+VoDiiLrbFBvc6BPh4iyKo2/ICdIodfgc5Q9cBjRivfQNUXBCEnQWcEInSXsvlNHY/ZQ=='
        crossorigin='anonymous'
        referrerpolicy='no-referrer'
        strategy='afterInteractive'
      ></Script>
    </>
  );
};
