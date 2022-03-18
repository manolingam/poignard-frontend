import Head from 'next/head';
import Script from 'next/script';

export const Meta = () => {
  return (
    <>
      <Head>
        <title>PoignART</title>
        <meta
          name='description'
          content='A platform for artists to create NFTs in support of Ukraine: all proceeds go to Unchain Fund.'
        />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css'
          integrity='sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog=='
          crossOrigin='anonymous'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css'
          integrity='sha512-10/jx2EXwxxWqCLX/hHth/vu2KY3jCF70dCQB8TSgNjbCVAC/8vai53GfMDrO2Emgwccf2pJqxct9ehpzG+MTw=='
          crossOrigin='anonymous'
          referrerpolicy='no-referrer'
        />
      </Head>
      <Script
        src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/js/all.min.js'
        integrity='sha512-YSdqvJoZr83hj76AIVdOcvLWYMWzy6sJyIMic2aQz5kh2bPTd9dzY3NtdeEAzPp/PhgZqr4aJObB3ym/vsItMg=='
        crossOrigin='anonymous'
      ></Script>
      <Script
        src='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/js/all.min.js'
        integrity='sha512-Cvxz1E4gCrYKQfz6Ne+VoDiiLrbFBvc6BPh4iyKo2/ICdIodfgc5Q9cBjRivfQNUXBCEnQWcEInSXsvlNHY/ZQ=='
        crossorigin='anonymous'
        referrerpolicy='no-referrer'
      ></Script>
    </>
  );
};
