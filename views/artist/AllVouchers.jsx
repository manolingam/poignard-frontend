/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { Flex, Text, Image as ChakraImage } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { BigNumber, utils } from 'ethers';

import { AppContext } from '../../context/AppContext';
import useWarnings from '../../hooks/useWarnings';

import { InfiniteGrid } from './InfiniteGrid';
import { ArtistInfo } from './ArtistInfo';
import { Voucher } from './Voucher';

import { theme } from '../../themes/theme';
import { CHAIN_ID, CHAIN_NAME, IMAGES_PER_RENDER } from '../../config';
import { fetchArtist, redeemVoucher } from '../../utils/requests';
import { redeem, getTokenURI } from '../../utils/web3';
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

export const AllVouchers = ({ artistAddress }) => {
  const context = useContext(AppContext);
  const { triggerToast } = useWarnings();

  const [count, setCount] = useState({
    prev: 0,
    next: IMAGES_PER_RENDER
  });
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState([]);

  const [fetched, setFetched] = useState(false);
  const [dialogStatus, setDialogStatus] = useState(false);
  const [dialogData, setDialogData] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [isRedeemed, setIsRedeemed] = useState(false);

  const [artist, setArtist] = useState(null);
  const [createdVouchers, setCreatedVouchers] = useState([]);

  const storeData = async (voucher) => {
    try {
      setLoadingText('Storing offchain data..');
      const { data } = await redeemVoucher(
        {
          tokenID: voucher.tokenID
        },
        context.signature
      );

      setIsRedeemed(true);
    } catch (err) {
      console.log(err);
      triggerToast('Failed to store data offchain.');
    }
  };

  const handleRedeem = async (voucher) => {
    if (Number(context.chainId) == CHAIN_ID) {
      setLoading(true);
      setLoadingText('Checking token..');

      let uri;
      try {
        uri = await getTokenURI(voucher.tokenID, context.ethersProvider);
      } catch (err) {
        console.log(err.message);
      }

      if (uri) {
        triggerToast('Token already minted. Updating records!');
        await storeData(voucher);
        setLoading(false);
        return;
      }

      setLoadingText('Awaiting transaction..');
      let tx;

      try {
        tx = await redeem(
          context.ethersProvider,
          context.signerAddress,
          {
            tokenId: voucher.tokenID,
            minPrice: BigNumber.from(voucher.minPrice),
            uri: voucher.tokenURI
          },
          voucher.signature,
          artist.merkleProof
        );
        setLoadingText('Transaction in progress..');
        if (tx) {
          const { status } = await tx.wait();
          if (status === 1) {
            await storeData(voucher);
          } else {
            triggerToast('Transaction failed.');
          }
        }
      } catch (err) {
        console.log(err);
        triggerToast('Transaction failed.');
      }
      setLoading(false);
    } else {
      triggerToast(`Please switch to ${CHAIN_NAME[CHAIN_ID]}`);
    }
  };

  const getMoreData = () => {
    if (createdVouchers.length) {
      if (current.length === createdVouchers.length) {
        setHasMore(false);
        return;
      } else {
        setCurrent(
          current.concat(
            createdVouchers.slice(
              count.prev + IMAGES_PER_RENDER,
              count.next + IMAGES_PER_RENDER
            )
          )
        );
        setCount((prevState) => ({
          prev: prevState.prev + IMAGES_PER_RENDER,
          next: prevState.next + IMAGES_PER_RENDER
        }));
        return;
      }
    }
  };

  const resetState = () => {
    setIsRedeemed(false);
    setFetched(false);
    setCreatedVouchers([]);
    setArtist(null);
    setCurrent([]);

    setCount({
      prev: 0,
      next: IMAGES_PER_RENDER
    });
  };

  const handleFetch = async () => {
    resetState();

    if (!utils.isAddress(artistAddress)) {
      triggerToast('Invalid artist address');
      setFetched(true);
      return;
    }

    const { data } = await fetchArtist(context.signature, artistAddress);

    if (!data.data.artist) {
      setArtist(null);
      setFetched(true);
      return;
    }

    if (data.data.artist.createdVouchers.length > 0) {
      setArtist(data.data.artist);
      setCreatedVouchers(data.data.artist.createdVouchers);
      setCurrent(
        data.data.artist.createdVouchers.slice(count.prev, count.next)
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
    if (context.signature) {
      handleFetch();
    }
  }, [context.signature]);

  return (
    <Flex
      direction='column'
      alignItems='center'
      px={{ base: '1rem', lg: '4rem' }}
      mb='1rem'
    >
      {!dialogStatus && (
        <>
          {fetched && artist && (
            <ArtistInfo
              artist={artist}
              signer={context.signerAddress}
              signature={context.signature}
            />
          )}

          {/* If wallet is not connected */}
          {!context.signature && (
            <Flex direction='column' alignItems='center' my='auto'>
              <ChakraImage
                src={illustrations.connectWallet}
                alt='not found'
                w='200px'
                mb='2rem'
              />
              <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
                Connect wallet to view vouchers.
              </StyledTag>
            </Flex>
          )}

          {/* Wallet connect & is fetching vouchers */}
          {!fetched && context.signature && (
            <Flex direction='column' alignItems='center' my='auto'>
              <ChakraImage src='/assets/loader.gif' alt='loading' w='200px' />
              <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
                Fetching vouchers...
              </StyledTag>
            </Flex>
          )}

          {/* Vouchers fetched */}
          {fetched && artist && (
            <Flex direction='column' w='100%' alignItems='center'>
              {createdVouchers.length > 0 && (
                <InfiniteGrid
                  currentVouchers={current}
                  fullVouchersLength={createdVouchers.length}
                  getMoreData={getMoreData}
                  hasMoreVouchers={hasMore}
                  setDialogData={setDialogData}
                  setDialogStatus={setDialogStatus}
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
          {artist && !createdVouchers.length && (
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
        </>
      )}

      {dialogStatus && (
        <Voucher
          voucher={dialogData}
          isRedeemed={isRedeemed}
          loading={loading}
          loadingText={loadingText}
          handleFetch={handleFetch}
          handleRedeem={handleRedeem}
          setDialogStatus={setDialogStatus}
        />
      )}
    </Flex>
  );
};
