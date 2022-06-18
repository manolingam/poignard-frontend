/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import axios from 'axios';

import { theme } from '../themes/theme';

import { Meta } from '../shared/Meta';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';

import { SectionOne } from '../views/landing/SectionOne';
import { SectionTwo } from '../views/landing/SectionTwo';
import { SectionThree } from '../views/landing/SectionThree';
import { SectionFour } from '../views/landing/SectionFour';
import { SectionFive } from '../views/landing/SectionFive';
import { SectionSix } from '../views/landing/SectionSix';
import { SectionSeven } from '../views/landing/SectionSeven';
import { SectionEight } from '../views/landing/SectionEight';

import { UNCHAIN_INCOME_API } from '../config';

// export const getServerSideProps = async () => {
//   const { data } = await axios.get(UNCHAIN_INCOME_API);

//   let totalIncome = 0;

//   data.wallets.walletUSD.map((wallet) => {
//     totalIncome += wallet.usd;
//   });

//   return {
//     props: {
//       unchainIncome: totalIncome
//         .toLocaleString('en-US', {
//           style: 'currency',
//           currency: 'USD'
//         })
//         .split('.')[0]
//     }
//   };
// };

export default function Home({ unchainIncome }) {
  const [windowWidth, setWindowWidth] = useState('');

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.removeEventListener('resize', () => {});
    window.addEventListener('resize', (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <Flex
      minH='100vh'
      w='100%'
      direction='column'
      fontFamily={theme.fonts.poppins}
    >
      <Meta />
      <Header windowWidth={windowWidth} />
      <SectionOne unchainIncome={unchainIncome} />
      <SectionTwo />
      <SectionThree />
      <SectionFour unchainIncome={unchainIncome} />
      <SectionFive />
      <SectionSix />
      <SectionSeven />
      <SectionEight />
      <Footer />
    </Flex>
  );
}
