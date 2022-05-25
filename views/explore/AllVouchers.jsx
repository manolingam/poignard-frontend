/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import {
  Flex,
  Switch,
  Heading,
  HStack,
  Tabs,
  TabList,
  Tab,
  Tooltip,
  Box
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { InfiniteGrid } from './InfiniteGrid';

import { AppContext } from '../../context/AppContext';

import { theme } from '../../themes/theme';

const StyledHeading = styled(Heading)`
  color: ${theme.colors.brand.black};
  font-family: ${theme.fonts.spaceGrotesk};
  text-align: center;
  font-size: 35px;
  margin-bottom: 4rem;
`;

export const AllVouchers = ({ mintedVouchers, unmintedVouchers }) => {
  const context = useContext(AppContext);
  const tabsAndType = ['All', 'Image', 'Video', 'Audio'];

  const [tabIndex, setTabIndex] = useState(0);
  const [contentType, setContentType] = useState(tabsAndType[tabIndex]);
  const [onlyMintable, setOnlyMintable] = useState(true);

  useEffect(() => {
    if (context.redeemEvent) {
      context.updateRedeemEvent(false);
    }
  }, []);

  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      px={{ base: '1rem', lg: '4rem' }}
      py={{ base: '2rem', lg: '4rem' }}
      mb='1rem'
    >
      {/* Wallet connect & is fetching vouchers */}
      {/* {!context.firstVouchersFetch && (
        <Flex direction='column' alignItems='center' my='auto'>
          <ChakraImage src='assets/loader.svg' alt='loading' w='200px' />
        </Flex>
      )} */}

      <Flex
        direction='column'
        w='100%'
        alignItems='center'
        justifyContent='center'
      >
        <StyledHeading>Explore Artworks</StyledHeading>

        <Flex
          w='100%'
          direction={{ base: 'column', lg: 'row' }}
          alignItems='center'
          justifyContent='space-between'
          mb='2rem'
        >
          <Tabs
            align='center'
            isLazy
            defaultIndex={0}
            variant='unstyled'
            outline='none'
            onChange={(index) => {
              setTabIndex(index);
              setContentType(tabsAndType[index]);
            }}
          >
            <TabList>
              <Tab
                _selected={{
                  color: theme.colors.brand.white,
                  bg: theme.colors.brand.blue
                }}
                _focus={{
                  outline: '0 !important'
                }}
              >
                All
              </Tab>
              <Tab
                _selected={{
                  color: theme.colors.brand.white,
                  bg: theme.colors.brand.blue
                }}
                _focus={{
                  outline: '0 !important'
                }}
              >
                Images
              </Tab>
              <Tab
                _selected={{
                  color: theme.colors.brand.white,
                  bg: theme.colors.brand.blue
                }}
                _focus={{
                  outline: '0 !important'
                }}
              >
                Videos
              </Tab>
              <Tab
                _selected={{
                  color: theme.colors.brand.white,
                  bg: theme.colors.brand.blue
                }}
                _focus={{
                  outline: '0 !important'
                }}
              >
                Audios
              </Tab>
            </TabList>
          </Tabs>

          <HStack>
            <Box>
              <Tooltip label='toggle minted vouchers'>
                <span style={{ width: '15px', marginRight: '5px' }}>
                  <i className='fa-solid fa-circle-info'></i>
                </span>
              </Tooltip>
            </Box>

            <Switch
              defaultChecked={onlyMintable}
              onChange={() => setOnlyMintable((prevState) => !prevState)}
            />
          </HStack>
        </Flex>

        {unmintedVouchers.length != 0 && onlyMintable && (
          <InfiniteGrid
            allVouchers={unmintedVouchers}
            onlyMintable={onlyMintable}
            contentType={contentType}
          />
        )}

        {mintedVouchers.length != 0 && !onlyMintable && (
          <InfiniteGrid
            allVouchers={mintedVouchers}
            onlyMintable={onlyMintable}
            contentType={contentType}
          />
        )}
      </Flex>
    </Flex>
  );
};
