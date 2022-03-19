/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  SimpleGrid,
  Flex,
  Button,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Switch,
  FormControl,
  FormLabel,
  Box,
  Image as ChakraImage,
  Link
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { BigNumber, utils } from 'ethers';
import Image from 'next/image';

import { AppContext } from '../../context/AppContext';

import useWarnings from '../../hooks/useWarnings';
import RadioBox from '../../shared/RadioBox';
import { fetchVouchers, redeemVoucher } from '../../utils/requests';
import { uriToHttp } from '../../utils/helpers';
import { redeem } from '../../utils/web3';

import { theme } from '../../themes/theme';
import { POIGNARD_CONTRACT_ADDRESS, IMAGES_PER_RENDER } from '../../config';
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

const StyledButton = styled(Button)`
  height: 50px;
  width: 100%;
  font-family: ${theme.fonts.spaceGrotesk};
  text-transform: uppercase;
  border: 2px solid ${theme.colors.brand.black};
  border-radius: 3px;
  color: ${theme.colors.brand.black};
  background: white;
  box-decoration-break: clone;
  padding-left: 24px;
  padding-right: 24px;
  &:hover {
    opacity: 0.6;
  }
`;

const StyledTokenId = styled(Text)`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 5px 10px;
  background-color: ${theme.colors.brand.yellow};
  font-family: ${theme.fonts.spaceMono};
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
    if (Number(context.chainId) == 4) {
      setLoading(true);
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
          voucher.signature
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
      triggerToast('Please switch to the Rinkeby testnet');
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
      }
    }
  };

  const resetState = () => {
    setIsRedeemed(false);
    setFetched(false);
    setMintedVouchers([]);
    setRedeemableVouchers([]);
    // setHasMoreRedeemable(true);
    // setHasMoreMinted(true);

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
          <InfiniteScroll
            dataLength={
              onlyMintable ? redeemableCurrent.length : mintedCurrent.length
            }
            next={getMoreData}
            hasMore={onlyMintable ? hasMoreRedeemable : hasMoreMinted}
            loader={
              <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
                Scroll for more..
              </StyledTag>
            }
            endMessage={
              <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
                End of list :))
              </StyledTag>
            }
          >
            <SimpleGrid
              columns={{ lg: 3, md: 2, base: 1 }}
              gridGap={{ base: 5, lg: 10 }}
              w='100%'
            >
              {(onlyMintable ? redeemableCurrent : mintedCurrent).map(
                (voucher, index) => {
                  return (
                    <Box
                      key={index}
                      position='relative'
                      cursor='pointer'
                      _hover={{
                        opacity: 0.7
                      }}
                      onClick={() => {
                        setDialogData(voucher);
                        setDialogStatus(true);
                      }}
                      mb='2rem'
                    >
                      <Image
                        src={uriToHttp(voucher.metadata.image)}
                        alt='minted nft'
                        width='300px'
                        height='100%'
                        objectFit='cover'
                      />

                      <Box
                        key={index}
                        position='absolute'
                        bottom='0'
                        left='0'
                        bg={theme.colors.brand.yellow}
                        p='7px'
                        h='35px'
                        w='35px'
                      >
                        {voucher.contentType === 'audio' && (
                          <span>
                            <i className='fa-solid fa-music'></i>
                          </span>
                        )}
                        {voucher.contentType === 'video' && (
                          <span>
                            <i className='fa-solid fa-video'></i>
                          </span>
                        )}
                        {voucher.contentType === 'image' && (
                          <span>
                            <i className='fa-solid fa-image'></i>
                          </span>
                        )}
                      </Box>

                      <StyledTokenId>
                        {onlyMintable
                          ? `${utils.formatEther(voucher.minPrice)} ETH`
                          : 'Sold'}
                      </StyledTokenId>
                    </Box>
                  );
                }
              )}
            </SimpleGrid>
          </InfiniteScroll>
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

      <AlertDialog
        isOpen={dialogStatus}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize='25px'
              fontWeight='bold'
              fontFamily={theme.fonts.spaceGrotesk}
              color={theme.colors.brand.black}
            >
              {dialogStatus && `${dialogData.metadata.name.substring(0, 25)}`}
            </AlertDialogHeader>

            <AlertDialogBody fontFamily={theme.fonts.spaceMono}>
              <Flex direction='column'>
                {(dialogData.contentType === 'image' ||
                  dialogData.contentType === 'audio') && (
                  <ChakraImage
                    src={dialogStatus && uriToHttp(dialogData.metadata.image)}
                    alt='minted nft'
                    fallbackSrc='assets/loader.gif'
                    height='200px'
                    width='auto'
                    objectFit={
                      dialogData &&
                      (dialogData.contentType === 'audio' ? 'cover' : 'contain')
                    }
                  />
                )}

                {dialogData.contentType === 'video' && (
                  <video
                    width='100%'
                    height='auto'
                    style={{ marginBottom: '2rem' }}
                    controls
                  >
                    <source
                      src={
                        dialogStatus &&
                        `https://poignart.ams3.cdn.digitaloceanspaces.com/${dialogData.metadata.animation_url.replace(
                          'ipfs://',
                          ''
                        )}`
                      }
                      type='video/mp4'
                    />
                  </video>
                )}

                {dialogData.contentType === 'audio' && (
                  <audio
                    height='auto'
                    width='100%'
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '0',
                      right: '0',
                      marginLeft: 'auto',
                      marginRight: 'auto'
                    }}
                    controls
                  >
                    <source
                      src={
                        dialogStatus &&
                        uriToHttp(dialogData.metadata.animation_url)
                      }
                    />
                  </audio>
                )}

                <Text
                  mt='1.5rem'
                  color={theme.colors.brand.black}
                  fontFamily={theme.fonts.spaceGrotesk}
                >
                  {dialogStatus &&
                    dialogData.metadata.description.substring(0, 250)}
                  {dialogStatus &&
                    dialogData.metadata.description.length > 250 &&
                    ' ..'}
                </Text>

                <Text
                  mt='.5rem'
                  color={theme.colors.brand.chineseSilver}
                  fontFamily={theme.fonts.spaceGrotesk}
                >{`Created by ${
                  dialogStatus && dialogData.createdBy.name
                }`}</Text>

                {!onlyMintable && (
                  <Button
                    w='100%'
                    mt='2rem'
                    mb='1rem'
                    borderRadius='10px'
                    bg='rgb(32, 129, 226)'
                    color={theme.colors.brand.white}
                    fontWeight='bold'
                    fontFamily={theme.fonts.spaceGrotesk}
                    onClick={() =>
                      window.open(
                        `https://testnets.opensea.io/assets/${POIGNARD_CONTRACT_ADDRESS}/${dialogData.tokenID}`,
                        '_blank'
                      )
                    }
                  >
                    View on opensea
                  </Button>
                )}
              </Flex>
            </AlertDialogBody>

            {onlyMintable && (
              <AlertDialogFooter>
                {isRedeemed ? (
                  <Button
                    w='100%'
                    mt='2rem'
                    mb='1rem'
                    borderRadius='10px'
                    bg='rgb(32, 129, 226)'
                    color={theme.colors.brand.white}
                    fontWeight='bold'
                    fontFamily={theme.fonts.spaceGrotesk}
                    onClick={() =>
                      window.open(
                        `https://testnets.opensea.io/assets/${POIGNARD_CONTRACT_ADDRESS}/${dialogData.tokenID}`,
                        '_blank'
                      )
                    }
                  >
                    View on opensea
                  </Button>
                ) : (
                  <StyledButton
                    className='dialog-button-select'
                    isLoading={loading}
                    loadingText={loadingText}
                    onClick={() => {
                      if (isRedeemed) {
                        handleFetch();
                        setDialogStatus(false);
                      } else {
                        handleRedeem(dialogData);
                      }
                    }}
                  >
                    {dialogStatus &&
                      `Mint for ${utils.formatEther(dialogData.minPrice)} ETH`}
                  </StyledButton>
                )}
              </AlertDialogFooter>
            )}
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};
