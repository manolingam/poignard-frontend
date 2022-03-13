/* eslint-disable react/no-children-prop */
import { useContext, useState, useRef, useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  InputRightAddon,
  InputGroup,
  Button,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { utils } from 'ethers';

import { AppContext } from '../../context/AppContext';
import { uploadArt, uploadMetadata } from '../../utils/ipfs';
import { generateNFTVoucher, uriToHttp } from '../../utils/helpers';
import { submitVoucher, verifyArtist } from '../../utils/requests';
import { META_DATA_CREATED_BY, META_DATA_EXTERNAL_URL } from '../../config';
import useWarnings from '../../hooks/useWarnings';

import { theme } from '../../themes/theme';

const StyledTextArea = styled(Textarea)`
  border: 2px solid ${theme.colors.brand.black};
  border-radius: 0;
`;

const StyledInput = styled(Input)`
  border: 2px solid ${theme.colors.brand.black};
  border-radius: 0;
`;

const StyledButton = styled(Button)`
  height: 50px;
  font-family: ${theme.fonts.spaceGrotesk};
  text-transform: uppercase;
  border: 2px solid ${theme.colors.brand.black};
  border-radius: 3px;
  box-decoration-break: clone;
  padding-left: 24px;
  padding-right: 24px;
  &:hover {
    opacity: 0.6;
  }
`;

export const ArtworkForm = () => {
  const context = useContext(AppContext);
  const cancelRef = useRef();

  const [buttonClick, setButtonClickStatus] = useState(false);
  const [uriStatus, setUriStatus] = useState(false);
  const [signatureStatus, setSignatureStatus] = useState(false);

  const [tokenUri, setTokenUri] = useState('');
  const [imageUri, setImageUri] = useState('');

  const [image, setImage] = useState('');
  const [blobImage, setBlobImage] = useState('');

  const [dialogStatus, setDialogStatus] = useState(false);

  const { triggerToast } = useWarnings();

  const onClose = () => {
    window.location.reload();
  };

  const refreshTokenID = async () => {
    try {
      const { data } = await verifyArtist(
        context.signerAddress,
        context.signature
      );

      if (data.response.verified && data.response.artist) {
        context.setDbData({
          db_artist: data.response.artist,
          db_merkleProof: data.response.proof,
          db_next_token_id: data.response.nextTokenID
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refreshTokenID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIpfsUpload = async () => {
    setUriStatus(true);
    const reader = new FileReader();
    reader.addEventListener('load', async () => {
      const buffer = Buffer.from(reader.result);
      try {
        const imageUri = `ipfs://${await uploadArt(buffer)}`;
        setImageUri(imageUri);
        if (imageUri) {
          const metadata = {
            name: context.art_name,
            description: context.art_description,
            image: imageUri,
            created_by: META_DATA_CREATED_BY,
            external_url: META_DATA_EXTERNAL_URL
          };
          const metadataUri = `ipfs://${await uploadMetadata(metadata)}`;
          setTokenUri(metadataUri);
          setUriStatus(false);
        }
      } catch (err) {
        setUriStatus(false);
        console.log(err);
      }
    });
    reader.readAsArrayBuffer(blobImage);
  };

  const handleSignature = async () => {
    setSignatureStatus(true);
    try {
      const mintPriceInWei = utils.parseUnits(context.art_price, 18);
      const { domain, types, voucher } = generateNFTVoucher(
        context.db_next_token_id,
        tokenUri,
        mintPriceInWei,
        context.chainId
      );
      const _voucherSignature = await context.ethersProvider
        .getSigner()
        ._signTypedData(domain, types, voucher);

      const { data } = await submitVoucher(
        {
          tokenID: context.db_next_token_id,
          tokenURI: tokenUri,
          minPrice: mintPriceInWei.toString(),
          createdBy: context.db_artist._id,
          signature: _voucherSignature,
          minted: false,
          metadata: {
            name: context.art_name,
            description: context.art_description,
            image: imageUri
          }
        },
        context.signature
      );
      console.log(data);
      setSignatureStatus(false);
      setDialogStatus(true);
    } catch (err) {
      console.log(err);
      setSignatureStatus(false);
    }
  };

  const handleImageChange = (event) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setBlobImage(file);
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      function () {
        setImage(reader.result);
        context.setArtImage(reader.result);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Flex w='100%' direction='column'>
      <Stack
        mb={{ base: 10, lg: 0 }}
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: 0, lg: 5 }}
      >
        <FormControl
          isRequired
          isInvalid={context.art_name === '' && buttonClick ? true : false}
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
          mb={10}
        >
          <FormLabel>Got a name for your art?</FormLabel>
          <StyledInput
            placeholder='A name for the NFT..'
            onChange={context.inputChangeHandler}
            name='art_name'
            value={context.art_name}
          />
        </FormControl>

        <FormControl
          isRequired
          isInvalid={context.art_price === '' && buttonClick ? true : false}
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
        >
          <FormLabel>Set a mint price?</FormLabel>
          <InputGroup>
            <StyledInput
              maxW='30%'
              type='number'
              placeholder='The price at which the NFT will be minted'
              onChange={context.inputChangeHandler}
              name='art_price'
              min={0}
              value={context.art_price}
            />
            <InputRightAddon children='ETH' />
          </InputGroup>
        </FormControl>
      </Stack>

      <FormControl
        mb={10}
        isRequired
        isInvalid={context.art_description === '' && buttonClick ? true : false}
        fontFamily={theme.fonts.spaceMono}
        color={theme.colors.brand.darkCharcoal}
      >
        <FormLabel>Explain about the artwork</FormLabel>
        <StyledTextArea
          placeholder='The NFT description'
          onChange={context.inputChangeHandler}
          name='art_description'
          value={context.art_description}
        />
      </FormControl>

      <Flex
        mb={10}
        mx='auto'
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: 0, lg: 5 }}
        alignItems='center'
        justifyContent='center'
        h='250px'
        w='100%'
      >
        <input
          type='file'
          name='art_image'
          accept='image/png, image/jpg, image/jpeg, image/webp'
          onChange={handleImageChange}
          style={{
            fontFamily: "'Poppins', sans-serif",
            position: 'relative',
            zIndex: '1'
          }}
        />
        <Box
          bgColor={!image && theme.colors.brand.brightGrey}
          bgImage={image && image}
          h='250px'
          w='100%'
          backgroundSize='contain'
          backgroundRepeat='no-repeat'
          backgroundPosition='center'
          mt={{ base: '1rem' }}
        ></Box>
      </Flex>

      <Flex direction='row' justifyContent='space-between' alignItems='center'>
        <StyledButton
          mr='1rem'
          color={theme.colors.brand.black}
          onClick={() =>
            context.updateStage(context.hasMinterRole ? 0 : context.stage - 1)
          }
        >
          Back
        </StyledButton>

        <StyledButton
          isLoading={uriStatus || signatureStatus}
          color={theme.colors.brand.white}
          bg={theme.colors.brand.black}
          onClick={() => {
            if (
              context.art_name &&
              context.art_price &&
              context.art_description &&
              image
            ) {
              setButtonClickStatus(false);
              if (tokenUri) {
                handleSignature();
              } else {
                handleIpfsUpload();
              }
            } else {
              setButtonClickStatus(true);
              triggerToast('Please fill in all the required fields.');
            }
          }}
        >
          {tokenUri ? 'Sign Voucher' : 'Generate Voucher'}
        </StyledButton>

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
                color={theme.colors.brand.yellow}
              >
                {`Voucher Signed for ${context.art_name}!`}
              </AlertDialogHeader>

              <AlertDialogBody fontFamily={theme.fonts.spaceMono}>
                <Box
                  bgImage={uriToHttp(imageUri)[1]}
                  bgSize='contain'
                  bgRepeat='no-repeat'
                  bgPosition='center'
                  height='200px'
                  width='100%'
                  mb='2rem'
                />

                {context.art_description}
                <Text
                  mt='.5rem'
                  color={theme.colors.brand.chineseSilver}
                  fontWeight='bold'
                  fontFamily={theme.fonts.spaceGrotesk}
                >{`Listing for ${context.art_price} ETH`}</Text>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Link href='/explore' passHref>
                  <StyledButton
                    className='dialog-button-cancel'
                    ref={cancelRef}
                  >
                    Explore
                  </StyledButton>
                </Link>
                <Link href='/submit' passHref>
                  <StyledButton className='dialog-button-select' ml={3}>
                    Submit Another
                  </StyledButton>
                </Link>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
    </Flex>
  );
};
