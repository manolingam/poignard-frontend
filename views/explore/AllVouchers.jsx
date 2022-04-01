/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import {
  Flex,
  Text,
  Switch,
  FormControl,
  FormLabel,
  Image as ChakraImage
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import RadioBox from '../../shared/RadioBox';

import { InfiniteGrid } from './InfiniteGrid';

import { AppContext } from '../../context/AppContext';

import { theme } from '../../themes/theme';
import { VOUCHERS_PER_PAGE } from '../../config';
import { fetchVouchers } from '../../utils/requests';
import { illustrations } from '../../utils/constants';

const StyledTag = styled(Text)`
  max-width: 75%;
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.darkCharcoal};
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  margin: auto;
`;

export const AllVouchers = () => {
  const context = useContext(AppContext);

  const [mintedVouchers, setMintedVouchers] = useState([]);
  const [redeemableVouchers, setRedeemableVouchers] = useState([]);
  const [totalMintedPages, setTotalMintedPages] = useState(0);
  const [totalRedeemablePages, setTotalRedeemablePages] = useState(0);

  const [contentType, setContentType] = useState('All');
  const [fetched, setFetched] = useState(false);
  const [onlyMintable, setOnlyMintable] = useState(true);

  const resetState = () => {
    setFetched(false);
    setMintedVouchers([]);
    setRedeemableVouchers([]);
  };

  const handleFetch = async () => {
    resetState();
    const mintedVouchers = await fetchVouchers(true, contentType.toLowerCase());
    if (mintedVouchers.data.data.vouchers.length > 0) {
      setMintedVouchers(mintedVouchers.data.data.vouchers);
      setTotalMintedPages(
        Math.ceil(mintedVouchers.data.data.vouchers.length / VOUCHERS_PER_PAGE)
      );
    }

    const unmintedVouchers = await fetchVouchers(
      false,
      contentType.toLowerCase()
    );
    if (unmintedVouchers.data.data.vouchers.length > 0) {
      setRedeemableVouchers(unmintedVouchers.data.data.vouchers);
      setTotalRedeemablePages(
        Math.ceil(
          unmintedVouchers.data.data.vouchers.length / VOUCHERS_PER_PAGE
        )
      );
    }
    setFetched(true);
  };

  useEffect(() => {
    handleFetch();
  }, [contentType]);

  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      px={{ base: '1rem', lg: '4rem' }}
      mb='1rem'
    >
      {/* Wallet connect & is fetching vouchers */}
      {!fetched && (
        <Flex direction='column' alignItems='center' my='auto'>
          <ChakraImage src='assets/loader.gif' alt='loading' w='200px' />
        </Flex>
      )}

      {/* Vouchers fetched */}
      {fetched && (
        <Flex direction='column' w='100%' alignItems='center'>
          <Flex
            w='100%'
            direction={{ base: 'column', lg: 'row' }}
            alignItems={{ base: 'flex-start', lg: 'center' }}
            justifyContent='space-between'
            mb='2rem'
          >
            <FormControl
              display='flex'
              direction='row'
              fontFamily={theme.fonts.spaceMono}
              color={theme.colors.brand.darkCharcoal}
            >
              <FormLabel fontWeight='bold'>Show mintable only</FormLabel>
              <Switch
                defaultChecked={onlyMintable}
                onChange={() => setOnlyMintable((prevState) => !prevState)}
              />
            </FormControl>
            <RadioBox
              stack='horizontal'
              options={['All', 'Image', 'Video', 'Audio']}
              updateRadio={setContentType}
              name='content_type'
              defaultValue={contentType}
              value={contentType}
            />
          </Flex>

          {onlyMintable && redeemableVouchers.length != 0 && (
            <InfiniteGrid
              allVouchers={redeemableVouchers}
              onlyMintable={onlyMintable}
              totalPages={totalRedeemablePages}
            />
          )}

          {!onlyMintable && mintedVouchers.length != 0 && (
            <InfiniteGrid
              allVouchers={mintedVouchers}
              onlyMintable={onlyMintable}
              totalPages={totalMintedPages}
            />
          )}
        </Flex>
      )}

      {/* fetched && no mintable vouchers && mintable filter */}
      {fetched && !mintedVouchers.length && !onlyMintable && (
        <Flex direction='column' alignItems='center' my='auto'>
          <ChakraImage
            src={illustrations.notFound}
            alt='not found'
            w='200px'
            mb='1rem'
          />
          <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
            No vouchers minted.
          </StyledTag>
        </Flex>
      )}

      {/* fetched && no vouchers minted && not mintable filter */}
      {fetched && !redeemableVouchers.length && onlyMintable && (
        <Flex direction='column' alignItems='center' my='auto'>
          <ChakraImage
            src={illustrations.notFound}
            alt='not found'
            w='200px'
            mb='2rem'
          />
          <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
            No mintable vouchers available.
          </StyledTag>
        </Flex>
      )}
    </Flex>
  );
};
