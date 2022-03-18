/* eslint-disable react/no-children-prop */
import { useContext, useState, useRef } from 'react';
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
  Image,
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

import RadioBox from '../../shared/RadioBox';
import { AppContext } from '../../context/AppContext';
import { uploadArt, uploadMetadata } from '../../utils/ipfs';
import { generateNFTVoucher, uriToHttp } from '../../utils/helpers';
import { submitVoucher, verifyArtist } from '../../utils/requests';
import {
  IN_APP_VOUCHERS_LIMIT,
  MAX_FILE_SIZE_MB,
  META_DATA_CREATED_BY,
  META_DATA_EXTERNAL_URL
} from '../../config';
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

const acceptedImageFileFormats = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/webp'
];

const acceptedVideoFileFormats = ['video/mp4'];

const acceptedAudioFileFormats = ['audio/mp3', 'audio/wav'];

export const ArtworkForm = () => {
  const context = useContext(AppContext);
  const cancelRef = useRef();

  const [uriStatus, setUriStatus] = useState(false);
  const [signatureStatus, setSignatureStatus] = useState(false);
  const [tokenUri, setTokenUri] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [animationUri, setAnimationUri] = useState('');

  const [submittedVouchers, setSubmittedVouchers] = useState(0);
  const [buttonClick, setButtonClickStatus] = useState(false);
  const [dialogStatus, setDialogStatus] = useState(false);

  const [contentType, setContentType] = useState('Image');
  const [image, setImage] = useState('');
  const [imageBuffer, setImageBuffer] = useState('');
  const [animationBuffer, setAnimationBuffer] = useState('');

  const { triggerToast } = useWarnings();

  const onClose = () => {
    context.resetArtState();
    setButtonClickStatus(false);
    setUriStatus(false);
    setSignatureStatus(false);
    setTokenUri('');
    setImageUri('');
    setAnimationUri('');
    setContentType('Image');
    setImage('');
    setImageBuffer('');
    setAnimationBuffer('');
    setDialogStatus(false);
    refreshTokenID();
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

  const handleIpfsUpload = async () => {
    try {
      setUriStatus(true);

      let metadata = {
        name: context.art_name,
        description: context.art_description,
        created_by: META_DATA_CREATED_BY,
        external_url: META_DATA_EXTERNAL_URL,
        attributes: {
          trait_type: 'Artist Address',
          trait_value: context.signerAddress
        }
      };

      const _imageUri = `ipfs://${await uploadArt(imageBuffer)}`;
      setImageUri(_imageUri);
      metadata['image'] = _imageUri;

      if (contentType === 'Video' || contentType === 'Audio') {
        const _animationUri = `ipfs://${await uploadArt(animationBuffer)}`;
        setAnimationUri(_animationUri);
        metadata['animation_url'] = _animationUri;
      }

      const metadataUri = await uploadMetadata(metadata);
      setTokenUri(metadataUri);
      setUriStatus(false);
    } catch (err) {
      setUriStatus(false);
      console.log(err);
    }
  };

  const handleSignature = async () => {
    try {
      setSignatureStatus(true);

      await refreshTokenID();
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
          contentType: contentType.toLowerCase(),
          metadata: {
            name: context.art_name,
            description: context.art_description,
            image: imageUri,
            animation_url: animationUri,
            attributes: [
              {
                trait_type: 'Artist Address',
                trait_value: context.signerAddress
              }
            ]
          }
        },
        context.signature
      );

      setSubmittedVouchers((prevState) => prevState + 1);
      setSignatureStatus(false);
      setDialogStatus(true);
    } catch (err) {
      console.log(err);
      setSignatureStatus(false);
    }
  };

  const handleImageUpload = async (event) => {
    if (!event.target.files) return;

    const file = event.target.files[0];

    const urlReader = new FileReader();
    const bufferReader = new FileReader();
    urlReader.addEventListener('load', () => {
      setImage(urlReader.result);
    });
    bufferReader.addEventListener('load', () => {
      const buffer = Buffer.from(bufferReader.result);
      setImageBuffer(buffer);
    });

    if (file) {
      urlReader.readAsDataURL(file);
      bufferReader.readAsArrayBuffer(file);
    }
  };

  const handleAnimationUpload = async (event) => {
    if (!event.target.files) return;

    const file = event.target.files[0];

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const buffer = Buffer.from(reader.result);
      setAnimationBuffer(buffer);
    });

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = async () => {
    if (submittedVouchers >= IN_APP_VOUCHERS_LIMIT)
      return triggerToast(
        'You have reached the limit of vouchers you can submit in an hour!'
      );

    if (!context.art_name || !context.art_description || !context.art_price) {
      setButtonClickStatus(true);
      return triggerToast('Please fill in all the required fields.');
    }

    if (context.art_name.length > 25) {
      setButtonClickStatus(true);
      return triggerToast('Name should be less than 25 characters.');
    }

    if (context.art_description.length > 250) {
      setButtonClickStatus(true);
      return triggerToast('Description should be less than 250 characters.');
    }

    if (!imageBuffer) {
      setButtonClickStatus(true);
      return triggerToast('Please upload an image.');
    }

    if (contentType === 'Audio' || contentType === 'Video') {
      if (!animationBuffer) {
        setButtonClickStatus(true);
        return triggerToast('Please upload an animation.');
      }
    }

    if (
      !acceptedImageFileFormats.includes(
        document.getElementById('image-file-input').files[0].type
      )
    ) {
      setButtonClickStatus(true);
      return triggerToast('Please upload an image in a valid format.');
    }

    if (
      contentType === 'Video' &&
      !acceptedVideoFileFormats.includes(
        document.getElementById('anim-file-input').files[0].type
      )
    ) {
      setButtonClickStatus(true);
      return triggerToast('Please upload a video in mp4 format.');
    }

    if (
      contentType === 'Audio' &&
      !acceptedAudioFileFormats.includes(
        document.getElementById('anim-file-input').files[0].type
      )
    ) {
      setButtonClickStatus(true);
      return triggerToast('Please upload a audio in mp3/wav format.');
    }

    if (
      Math.floor(
        document.getElementById('anim-file-input').files[0].size / 10 ** 6
      ) > MAX_FILE_SIZE_MB
    ) {
      triggerToast('File size is too large. Please upload a smaller file.');
      return;
    }

    setButtonClickStatus(false);

    if (tokenUri) {
      return handleSignature();
    }

    if (!tokenUri) {
      return handleIpfsUpload();
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

      <FormControl
        mb={10}
        isRequired
        fontFamily={theme.fonts.spaceMono}
        color={theme.colors.brand.darkCharcoal}
      >
        <FormLabel>Content type</FormLabel>
        <RadioBox
          stack='horizontal'
          options={['Image', 'Video', 'Audio']}
          updateRadio={setContentType}
          name='content_type'
          defaultValue={contentType}
          value={contentType}
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
        <FormControl
          mb={10}
          isRequired
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
        >
          <FormLabel>
            {contentType !== 'Image' ? 'Cover or thumbnail image' : contentType}
          </FormLabel>
          <input
            id='image-file-input'
            type='file'
            accept={acceptedImageFileFormats}
            onChange={handleImageUpload}
            style={{
              fontFamily: "'Poppins', sans-serif",
              position: 'relative',
              zIndex: '1'
            }}
          />
        </FormControl>
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

      {(contentType === 'Audio' || contentType === 'Video') && (
        <FormControl
          mb={10}
          isRequired
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
        >
          <FormLabel>{`${contentType}`}</FormLabel>
          <input
            id='anim-file-input'
            type='file'
            accept={
              contentType === 'Audio'
                ? acceptedAudioFileFormats
                : acceptedVideoFileFormats
            }
            onChange={handleAnimationUpload}
            style={{
              fontFamily: "'Poppins', sans-serif",
              position: 'relative',
              zIndex: '1'
            }}
          />
        </FormControl>
      )}

      <Flex direction='row' justifyContent='space-between' alignItems='center'>
        <StyledButton
          mr='1rem'
          color={theme.colors.brand.black}
          onClick={() =>
            context.updateStage(context.db_artist ? 0 : context.stage - 1)
          }
        >
          Back
        </StyledButton>

        <StyledButton
          isLoading={uriStatus || signatureStatus}
          color={theme.colors.brand.white}
          bg={theme.colors.brand.black}
          onClick={handleSubmit}
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
                <Image
                  src={uriToHttp(imageUri)}
                  alt='minted nft'
                  fallbackSrc='assets/loader.gif'
                  height='auto'
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

                <StyledButton
                  ml={3}
                  onClick={() => {
                    if (submittedVouchers < IN_APP_VOUCHERS_LIMIT) {
                      onClose();
                    } else {
                      window.location.href = '/';
                    }
                  }}
                >
                  {submittedVouchers < IN_APP_VOUCHERS_LIMIT
                    ? 'Submit Another'
                    : 'Home'}
                </StyledButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
    </Flex>
  );
};
