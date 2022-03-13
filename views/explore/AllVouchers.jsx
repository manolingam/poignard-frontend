import { useState, useEffect, useContext, useRef } from 'react';
import {
  SimpleGrid,
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
  Image
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { BigNumber, utils } from 'ethers';

import { AppContext } from '../../context/AppContext';

import useWarnings from '../../hooks/useWarnings';
import { fetchVouchers, redeemVoucher } from '../../utils/requests';
import { uriToHttp } from '../../utils/helpers';
import { redeem } from '../../utils/web3';

import { theme } from '../../themes/theme';

const StyledTag = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.darkCharcoal};
  text-align: justify;
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

  const cancelRef = useRef();
  const [fetched, setFetched] = useState(false);
  const [onlyMintable, setOnlyMintable] = useState(true);
  const [dialogStatus, setDialogStatus] = useState(false);
  const [dialogData, setDialogData] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [isRedeemed, setIsRedeemed] = useState(false);

  const onClose = () => {
    setDialogStatus(false);
    if (isRedeemed) {
      window.location.reload();
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

  const handleFetch = async () => {
    const mintedVouchers = await fetchVouchers(context.signature, true);
    if (mintedVouchers.data.data.vouchers.length > 0) {
      context.setDbData({
        db_vouchers_minted: mintedVouchers.data.data.vouchers
      });
    }
    const unmintedVouchers = await fetchVouchers(context.signature, false);
    if (unmintedVouchers.data.data.vouchers.length > 0) {
      context.setDbData({
        db_vouchers_not_minted: unmintedVouchers.data.data.vouchers
      });
    }
    setFetched(true);
  };

  useEffect(() => {
    if (context.signature) {
      handleFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.signature]);

  return (
    <>
      {/* If wallet is not connected */}
      {!context.signature && (
        <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
          Connect wallet to view vouchers.
        </StyledTag>
      )}

      {/* Wallet connect & is fetching vouchers */}
      {!fetched && context.signature && (
        <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
          Fetching vouchers...
        </StyledTag>
      )}

      {/* Vouchers fetched */}
      {fetched && (
        <>
          <FormControl
            display='flex'
            direction='row'
            fontFamily={theme.fonts.spaceMono}
            color={theme.colors.brand.darkCharcoal}
            px={{ base: '1rem', lg: '4rem' }}
            mb='1rem'
          >
            <FormLabel ml='auto' fontWeight='bold'>
              Show mintable only
            </FormLabel>
            <Switch
              defaultChecked={onlyMintable}
              onChange={() => setOnlyMintable((prevState) => !prevState)}
            />
          </FormControl>
          <SimpleGrid
            columns={{ lg: 3, md: 2, base: 1 }}
            gridGap={10}
            px={{ base: '1rem', lg: '4rem' }}
            mb='1rem'
          >
            {(onlyMintable
              ? context.db_vouchers_not_minted
              : context.db_vouchers_minted
            ).map((voucher, index) => {
              return (
                <Box
                  key={index}
                  position='relative'
                  cursor='pointer'
                  _hover={{
                    transform: 'scale(1.05)',
                    transitionDuration: '0.5s'
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
                    fallbackSrc='assets/loader.gif'
                    height='auto'
                    width='100%'
                  />
                  <StyledTokenId>
                    {onlyMintable
                      ? `${utils.formatEther(voucher.minPrice)} ETH`
                      : 'Sold'}
                  </StyledTokenId>
                </Box>
              );
            })}
          </SimpleGrid>
        </>
      )}

      {/* fetched && no mintable vouchers && mintable filter */}
      {fetched && !context.db_vouchers_minted.length && !onlyMintable && (
        <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
          No vouchers minted.
        </StyledTag>
      )}

      {/* fetched && no vouchers minted && not mintable filter */}
      {fetched && !context.db_vouchers_not_minted.length && onlyMintable && (
        <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
          No mintable vouchers available.
        </StyledTag>
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
              {dialogStatus && `${dialogData.metadata.name}`}
            </AlertDialogHeader>

            <AlertDialogBody fontFamily={theme.fonts.spaceMono}>
              <Image
                src={dialogStatus && uriToHttp(dialogData.metadata.image)}
                alt='minted nft'
                fallbackSrc='assets/loader.gif'
                height='auto'
                width='100%'
                mb='2rem'
              />

              {dialogStatus && dialogData.metadata.description}
              <Text
                mt='.5rem'
                color={theme.colors.brand.chineseSilver}
                fontWeight='bold'
                fontFamily={theme.fonts.spaceGrotesk}
              >{`Created by ${
                dialogStatus && dialogData.createdBy.name
              }`}</Text>

              {!onlyMintable && (
                <Text
                  maxW='50%'
                  isTruncated
                  mt='.5rem'
                  color={theme.colors.brand.yellow}
                  fontWeight='bold'
                  fontFamily={theme.fonts.spaceGrotesk}
                >{`Minted to ${dialogStatus && dialogData.mintedBy}`}</Text>
              )}
            </AlertDialogBody>

            {onlyMintable && (
              <AlertDialogFooter>
                {isRedeemed ? (
                  <Text
                    mt='.5rem'
                    color={theme.colors.brand.yellow}
                    fontWeight='bold'
                    textTransform='uppercase'
                    fontFamily={theme.fonts.spaceMono}
                  >
                    Successfully minted. Thank you!
                  </Text>
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
    </>
  );
};
