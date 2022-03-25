/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useRef } from 'react';
import {
  Flex,
  Text,
  Switch,
  FormControl,
  FormLabel,
  Image as ChakraImage
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { BigNumber } from 'ethers';

import useWarnings from '../../hooks/useWarnings';
import RadioBox from '../../shared/RadioBox';
import { VoucherModal } from './VoucherModal';
import { InfiniteGrid } from './InfiniteGrid';

import { AppContext } from '../../context/AppContext';

import { theme } from '../../themes/theme';
import { CHAIN_ID, CHAIN_NAME, IMAGES_PER_RENDER } from '../../config';
import { fetchVouchers, redeemVoucher } from '../../utils/requests';
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

export const AllVouchers = () => {
  const context = useContext(AppContext);
  const { triggerToast } = useWarnings();

  const [mintedCount, setMintedCount] = useState({
    prev: 0,
    next: IMAGES_PER_RENDER
  });
  const [hasMoreMinted, setHasMoreMinted] = useState(true);
  const [mintedCurrent, setMintedCurrent] = useState([]);

  const [redeemableCount, setRedeemableCount] = useState({
    prev: 0,
    next: IMAGES_PER_RENDER
  });
  const [hasMoreRedeemable, setHasMoreRedeemable] = useState(true);
  const [redeemableCurrent, setRedeemableCurrent] = useState([]);

  const cancelRef = useRef();
  const [contentType, setContentType] = useState('All');
  const [fetched, setFetched] = useState(false);
  const [onlyMintable, setOnlyMintable] = useState(true);
  const [dialogStatus, setDialogStatus] = useState(false);
  const [dialogData, setDialogData] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [isRedeemed, setIsRedeemed] = useState(false);

  const [mintedVouchers, setMintedVouchers] = useState([]);
  const [redeemableVouchers, setRedeemableVouchers] = useState([]);

  const onClose = async () => {
    setDialogStatus(false);
    if (isRedeemed) {
      setContentType('All');
      await handleFetch();
    }
  };

  const storeData = async (voucher) => {
    try {
      setLoadingText('Storing offchain data..');
      await redeemVoucher(
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
          voucher.createdBy.merkleProof
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
        triggerToast('Transaction failed.');
      }
      setLoading(false);
    } else {
      triggerToast(`Please switch to ${CHAIN_NAME[CHAIN_ID]} `);
    }
  };

  const getMoreData = () => {
    if (!onlyMintable && mintedVouchers.length) {
      if (mintedCurrent.length === mintedVouchers.length) {
        setHasMoreMinted(false);
        return;
      } else {
        setMintedCurrent(
          mintedCurrent.concat(
            mintedVouchers.slice(
              mintedCount.prev + IMAGES_PER_RENDER,
              mintedCount.next + IMAGES_PER_RENDER
            )
          )
        );
        setMintedCount((prevState) => ({
          prev: prevState.prev + IMAGES_PER_RENDER,
          next: prevState.next + IMAGES_PER_RENDER
        }));
        return;
      }
    } else if (onlyMintable && redeemableVouchers.length) {
      if (redeemableCurrent.length === redeemableVouchers.length) {
        setHasMoreRedeemable(false);
        return;
      } else {
        setRedeemableCurrent(
          redeemableCurrent.concat(
            redeemableVouchers.slice(
              redeemableCount.prev + IMAGES_PER_RENDER,
              redeemableCount.next + IMAGES_PER_RENDER
            )
          )
        );

        setRedeemableCount((prevState) => ({
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
    setMintedVouchers([]);
    setRedeemableVouchers([]);

    setMintedCount({
      prev: 0,
      next: IMAGES_PER_RENDER
    });
    setRedeemableCount({
      prev: 0,
      next: IMAGES_PER_RENDER
    });
  };

  const handleFetch = async () => {
    resetState();

    const mintedVouchers = await fetchVouchers(
      context.signature,
      true,
      contentType.toLowerCase()
    );
    if (mintedVouchers.data.data.vouchers.length > 0) {
      setMintedVouchers(mintedVouchers.data.data.vouchers);
      setMintedCurrent(
        mintedVouchers.data.data.vouchers.slice(
          mintedCount.prev,
          mintedCount.next
        )
      );
    }
    const unmintedVouchers = await fetchVouchers(
      context.signature,
      false,
      contentType.toLowerCase()
    );
    if (unmintedVouchers.data.data.vouchers.length > 0) {
      setRedeemableVouchers(unmintedVouchers.data.data.vouchers);
      setRedeemableCurrent(
        unmintedVouchers.data.data.vouchers.slice(
          redeemableCount.prev,
          redeemableCount.next
        )
      );
    }
    setFetched(true);
  };

  useEffect(() => {
    getMoreData();
  }, [onlyMintable]);

  useEffect(() => {
    if (context.signature) {
      handleFetch();
    }
  }, [context.signature, contentType]);

  return (
    <Flex
      direction='column'
      alignItems='center'
      px={{ base: '1rem', lg: '4rem' }}
      minH='70vh'
      mb='1rem'
    >
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
          <ChakraImage src='assets/loader.gif' alt='loading' w='200px' />
          <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
            Fetching vouchers...
          </StyledTag>
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
              onlyMintable={onlyMintable}
              currentVouchers={redeemableCurrent}
              fullVouchersLength={redeemableVouchers.length}
              getMoreData={getMoreData}
              hasMoreVouchers={hasMoreRedeemable}
              setDialogData={setDialogData}
              setDialogStatus={setDialogStatus}
            />
          )}

          {!onlyMintable && mintedVouchers.length != 0 && (
            <InfiniteGrid
              onlyMintable={onlyMintable}
              currentVouchers={mintedCurrent}
              getMoreData={getMoreData}
              hasMoreVouchers={hasMoreMinted}
              fullVouchersLength={mintedVouchers.length}
              setDialogData={setDialogData}
              setDialogStatus={setDialogStatus}
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

      {dialogStatus && (
        <VoucherModal
          dialogStatus={dialogStatus}
          cancelRef={cancelRef}
          onClose={onClose}
          voucher={dialogData}
          onlyMintable={onlyMintable}
          isRedeemed={isRedeemed}
          loading={loading}
          loadingText={loadingText}
          handleFetch={handleFetch}
          handleRedeem={handleRedeem}
          setDialogStatus={setDialogStatus}
          signature={context.signature}
        />
      )}
    </Flex>
  );
};
