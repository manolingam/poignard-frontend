import { useEffect } from 'react';
import {
  Flex,
  Button,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Image as ChakraImage
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { utils } from 'ethers';

import useWarnings from '../../hooks/useWarnings';

import { uriToHttp } from '../../utils/helpers';
import { theme } from '../../themes/theme';

import { POIGNARD_CONTRACT_ADDRESS } from '../../config';

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

export const VoucherModal = ({
  dialogStatus,
  cancelRef,
  onClose,
  voucher,
  isRedeemed,
  loading,
  loadingText,
  handleFetch,
  handleRedeem,
  setDialogStatus
}) => {
  const { triggerToast } = useWarnings();
  return (
    <AlertDialog
      isOpen={dialogStatus}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      closeOnOverlayClick={!loading}
      onOverlayClick={() => {
        loading && triggerToast('Wait for the current tx to finish.');
      }}
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
            {voucher.metadata.name.substring(0, 25)}
          </AlertDialogHeader>

          <AlertDialogBody fontFamily={theme.fonts.spaceMono}>
            <Flex direction='column'>
              {(voucher.contentType === 'image' ||
                voucher.contentType === 'audio') && (
                <ChakraImage
                  src={uriToHttp(voucher.metadata.image)}
                  alt='minted nft'
                  fallbackSrc='assets/loader.gif'
                  height='200px'
                  width='auto'
                  objectFit={
                    voucher.contentType === 'audio' ? 'cover' : 'contain'
                  }
                />
              )}

              {voucher.contentType === 'video' && (
                <video
                  width='100%'
                  height='auto'
                  style={{ marginBottom: '2rem' }}
                  controls
                >
                  <source
                    src={`https://poignart.ams3.cdn.digitaloceanspaces.com/${voucher.metadata.animation_url.replace(
                      'ipfs://',
                      ''
                    )}`}
                    type='video/mp4'
                  />
                </video>
              )}

              {voucher.contentType === 'audio' && (
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
                  <source src={uriToHttp(voucher.metadata.animation_url)} />
                </audio>
              )}

              <Text
                mt='1.5rem'
                color={theme.colors.brand.black}
                fontFamily={theme.fonts.spaceGrotesk}
              >
                {voucher.metadata.description.substring(0, 250)}
                {voucher.metadata.description.length > 250 && ' ..'}
              </Text>
              <Flex
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                mt='.5rem'
                color={theme.colors.brand.spanishGrey}
                fontFamily={theme.fonts.spaceMono}
                fontSize='12px'
              >
                <Text>
                  {`Sold for ${utils.formatEther(voucher.minPrice)} ETH`}{' '}
                </Text>
                <Text>{`${new Date(
                  Number(voucher.createdAt)
                ).toDateString()}`}</Text>
              </Flex>
            </Flex>
          </AlertDialogBody>

          <AlertDialogFooter>
            {(voucher.minted || isRedeemed) && (
              <Button
                w='100%'
                mb='1rem'
                borderRadius='10px'
                bg='rgb(32, 129, 226)'
                color={theme.colors.brand.white}
                fontWeight='bold'
                fontFamily={theme.fonts.spaceGrotesk}
                onClick={() =>
                  window.open(
                    `https://testnets.opensea.io/assets/${POIGNARD_CONTRACT_ADDRESS}/${voucher.tokenID}`,
                    '_blank'
                  )
                }
              >
                View on opensea
              </Button>
            )}

            {!voucher.minted && !isRedeemed && (
              <StyledButton
                className='dialog-button-select'
                isLoading={loading}
                loadingText={loadingText}
                onClick={() => {
                  if (isRedeemed) {
                    handleFetch();
                    setDialogStatus(false);
                  } else {
                    handleRedeem(voucher);
                  }
                }}
              >
                {`Mint for ${utils.formatEther(voucher.minPrice)} ETH`}
              </StyledButton>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
