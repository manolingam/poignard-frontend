/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { Flex, Text, Image as ChakraImage } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { utils } from 'ethers';

import { AppContext } from '../../context/AppContext';
import useWarnings from '../../hooks/useWarnings';

import { InfiniteGrid } from './InfiniteGrid';
import { ArtistInfo } from './ArtistInfo';

import { theme } from '../../themes/theme';
import { VOUCHERS_PER_PAGE } from '../../config';
import { fetchArtist } from '../../utils/requests';
import { illustrations } from '../../utils/constants';

const StyledTag = styled(Text)`
  max-width: 75%;
  color: ${theme.colors.brand.darkCharcoal};
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  margin: auto;
`;

export const Dashboard = ({ artistAddress }) => {
  const context = useContext(AppContext);
  const { triggerToast } = useWarnings();

  const [requireProfileEdit, setRequireProfileEdit] = useState(false);
  const [artist, setArtist] = useState(null);
  const [createdVouchers, setCreatedVouchers] = useState([]);
  const [totalCreatedVouchersPages, setTotalCreatedVouchersPages] = useState(0);

  const [fetched, setFetched] = useState(false);

  const resetState = () => {
    setFetched(false);
    setCreatedVouchers([]);
    setArtist(null);
  };

  const handleFetch = async () => {
    resetState();

    if (!utils.isAddress(artistAddress)) {
      triggerToast('Invalid artist address');
      setFetched(true);
      return;
    }

    const { data } = await fetchArtist(artistAddress);

    if (!data.data.artist) {
      setArtist(null);
      setFetched(true);
      return;
    }

    if (data.data.artist.createdVouchers.length > 0) {
      setArtist(data.data.artist);
      setCreatedVouchers(data.data.artist.createdVouchers);
      setTotalCreatedVouchersPages(
        Math.ceil(data.data.artist.createdVouchers.length / VOUCHERS_PER_PAGE)
      );
      setFetched(true);
      return;
    } else if (data.data.artist) {
      setArtist(data.data.artist);
      setFetched(true);
      return;
    }
  };

  useEffect(() => {
    if (utils.isAddress(artistAddress)) {
      handleFetch();
    }
  }, [artistAddress]);

  return (
    <Flex
      direction='column'
      alignItems='center'
      px={{ base: '1rem', lg: '4rem' }}
      py='2rem'
    >
      {fetched && artist && (
        <ArtistInfo
          artist={artist}
          signer={context.signerAddress}
          signature={context.signature}
          handleFetch={handleFetch}
          requireProfileEdit={requireProfileEdit}
          setRequireProfileEdit={setRequireProfileEdit}
        />
      )}

      {/* Wallet connect & is fetching vouchers */}
      {!fetched && context.signature && (
        <Flex direction='column' alignItems='center' my='auto'>
          <ChakraImage src='/assets/loader.svg' alt='loading' w='200px' />
        </Flex>
      )}

      {/* Vouchers fetched */}
      {fetched && artist && !requireProfileEdit && (
        <Flex direction='column' w='100%' alignItems='center'>
          {createdVouchers.length > 0 && (
            <InfiniteGrid
              allVouchers={createdVouchers}
              totalPages={totalCreatedVouchersPages}
            />
          )}
        </Flex>
      )}

      {fetched && !artist && (
        <Flex direction='column' alignItems='center' my='auto'>
          <ChakraImage
            src={illustrations.notFound}
            alt='not found'
            w='200px'
            mb='1rem'
          />
          <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
            Artist not found!
          </StyledTag>
        </Flex>
      )}

      {/* fetched && no mintable vouchers && mintable filter */}
      {artist && !createdVouchers.length && !requireProfileEdit && (
        <Flex direction='column' alignItems='center' my='auto'>
          <ChakraImage
            src={illustrations.notFound}
            alt='not found'
            w='200px'
            mb='1rem'
          />
          <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
            No vouchers created.
          </StyledTag>
        </Flex>
      )}
    </Flex>
  );
};
