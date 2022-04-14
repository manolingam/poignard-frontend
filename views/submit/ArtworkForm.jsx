/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
import { useContext, useState, useRef, useEffect } from 'react';

import {
  Flex,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  InputRightAddon,
  InputGroup,
  Button,
  Text,
  Image as ChakraImage,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { utils } from 'ethers';

import { TwitterIcon } from '../../icons/TwitterIcon';
import RadioBox from '../../shared/RadioBox';
import { AppContext } from '../../context/AppContext';
import { uploadArt, uploadMetadata } from '../../utils/ipfs';
import {
  generateNFTVoucher,
  uploadToBucket,
  uriToHttp
} from '../../utils/helpers';
import { submitVoucher, verifyArtist } from '../../utils/requests';
import { getMinPrice } from '../../utils/web3';
import useWarnings from '../../hooks/useWarnings';

import { theme } from '../../themes/theme';

import {
  IN_APP_VOUCHERS_LIMIT,
  MAX_FILE_SIZE_MB,
  META_DATA_CREATED_BY,
  META_DATA_EXTERNAL_URL,
  ACCEPTED_IMAGE_FILE_FORMATS,
  ACCEPTED_AUDIO_FILE_FORMATS,
  ACCEPTED_VIDEO_FILE_FORMATS,
  POIGNART_BUCKET_BASE_URL,
  devMode
} from '../../config';

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

  const [artName, setArtName] = useState('');
  const [artDesc, setArtDesc] = useState('');
  const [artPrice, setArtPrice] = useState(0);

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

  const [voucherMinPrice, setVoucherMinPrice] = useState(0);

  const [signedTokenId, setSignedTokenId] = useState('');

  const { triggerToast } = useWarnings();

  const onClose = () => {
    setArtName('');
    setArtDesc('');
    setArtPrice(0);
    setButtonClickStatus(false);
    setUriStatus(false);
    setSignatureStatus(false);
    setTokenUri('');
    setImageUri('');
    setAnimationUri('');
    setContentType('Image');
    setImage('');
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
          db_merkleProof: data.response.proof
        });

        return data.response.nextTokenID;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleIpfsUpload = async () => {
    try {
      setUriStatus(true);

      let metadata = {
        name: artName,
        description: artDesc,
        created_by: META_DATA_CREATED_BY,
        external_url: META_DATA_EXTERNAL_URL,
        attributes: [
          {
            trait_type: 'Artist Address',
            value: context.signerAddress
          }
        ]
      };

      const _imageUri = `ipfs://${await uploadArt(
        document.getElementById('image-file-input').files[0]
      )}`;
      setImageUri(_imageUri);
      metadata['image'] = _imageUri;
      await uploadToBucket(
        _imageUri,
        document.getElementById('image-file-input').files[0]
      );

      if (contentType === 'Video' || contentType === 'Audio') {
        const _animationUri = `ipfs://${await uploadArt(
          document.getElementById('anim-file-input').files[0]
        )}`;
        setAnimationUri(_animationUri);
        metadata['animation_url'] = _animationUri;
        await uploadToBucket(
          _animationUri,
          document.getElementById('anim-file-input').files[0]
        );
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

      const nextTokenId = await refreshTokenID();
      const mintPriceInWei = utils.parseUnits(artPrice, 18);
      const { domain, types, voucher } = generateNFTVoucher(
        nextTokenId,
        tokenUri,
        mintPriceInWei,
        context.chainId
      );
      const _voucherSignature = await context.ethersProvider
        .getSigner()
        ._signTypedData(domain, types, voucher);

      await submitVoucher(
        {
          tokenID: nextTokenId,
          tokenURI: tokenUri,
          minPrice: mintPriceInWei.toString(),
          createdBy: context.db_artist._id,
          signature: _voucherSignature,
          minted: false,
          contentType: contentType.toLowerCase(),
          metadata: {
            name: artName,
            description: artDesc,
            image: imageUri,
            animation_url: animationUri,
            attributes: [
              {
                trait_type: 'Artist Address',
                value: context.signerAddress
              }
            ]
          }
        },
        context.signature
      );

      setSignedTokenId(nextTokenId);
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

    urlReader.addEventListener('load', () => {
      setImage(urlReader.result);
    });

    if (file) {
      urlReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (submittedVouchers >= IN_APP_VOUCHERS_LIMIT)
      return triggerToast(
        'You have reached the limit of vouchers you can submit in an hour!'
      );

    if (!artName || !artDesc || !artPrice) {
      setButtonClickStatus(true);
      return triggerToast('Please fill in all the required fields.');
    }

    if (artPrice < voucherMinPrice) {
      setButtonClickStatus(true);
      return triggerToast(`Price must be greater than ${voucherMinPrice} ETH`);
    }

    if (artName.length > 25) {
      setButtonClickStatus(true);
      return triggerToast('Name should be less than 25 characters.');
    }

    if (artDesc.length > 250) {
      setButtonClickStatus(true);
      return triggerToast('Description should be less than 250 characters.');
    }

    if (!document.getElementById('image-file-input').files[0]) {
      setButtonClickStatus(true);
      return triggerToast('Please upload an image.');
    }

    if (contentType === 'Audio' || contentType === 'Video') {
      if (!document.getElementById('anim-file-input').files[0]) {
        setButtonClickStatus(true);
        return triggerToast('Please upload an animation.');
      }
    }

    if (
      !ACCEPTED_IMAGE_FILE_FORMATS.includes(
        document.getElementById('image-file-input').files[0].type
      )
    ) {
      setButtonClickStatus(true);
      return triggerToast('Please upload an image in a valid format.');
    }

    if (
      contentType === 'Video' &&
      !ACCEPTED_VIDEO_FILE_FORMATS.includes(
        document.getElementById('anim-file-input').files[0].type
      )
    ) {
      setButtonClickStatus(true);
      return triggerToast('Please upload a video in mp4 format.');
    }

    if (
      contentType === 'Audio' &&
      !ACCEPTED_AUDIO_FILE_FORMATS.includes(
        document.getElementById('anim-file-input').files[0].type
      )
    ) {
      setButtonClickStatus(true);
      return triggerToast('Please upload a audio in mp3/wav format.');
    }

    if (contentType === 'Audio' || contentType === 'Video') {
      if (
        Math.floor(
          document.getElementById('anim-file-input').files[0].size / 10 ** 6
        ) > MAX_FILE_SIZE_MB
      ) {
        triggerToast('File size is too large. Please upload a smaller file.');
        return;
      }
    }

    setButtonClickStatus(false);

    if (tokenUri) {
      return handleSignature();
    }

    if (!tokenUri) {
      return handleIpfsUpload();
    }
  };

  const _voucherMinPrice = async () => {
    const price = await getMinPrice(context.ethersProvider);
    setVoucherMinPrice(utils.formatEther(price));
  };

  useEffect(() => {
    _voucherMinPrice();
  }, []);

  return (
    <Flex w='100%' direction='column'>
      <Stack
        mb={{ base: 10, lg: 0 }}
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: 0, lg: 5 }}
      >
        <FormControl
          isRequired
          isInvalid={artName === '' && buttonClick ? true : false}
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
          mb={10}
        >
          <FormLabel>Got a name for your art?</FormLabel>
          <StyledInput
            placeholder='A name for the NFT..'
            onChange={(e) => setArtName(e.target.value)}
            value={artName}
          />
          <FormHelperText>
            {artName.length < 25
              ? `${25 - artName.length} characters left`
              : `Over character limit`}
          </FormHelperText>
        </FormControl>

        <FormControl
          isRequired
          isInvalid={artPrice === '' && buttonClick ? true : false}
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
        >
          <FormLabel>Set a mint price?</FormLabel>
          <InputGroup>
            <StyledInput
              maxW='30%'
              type='number'
              placeholder='The price at which the NFT will be minted'
              onChange={(e) => setArtPrice(e.target.value)}
              min={voucherMinPrice}
              value={artPrice}
            />
            <InputRightAddon children='ETH' />
          </InputGroup>
          <FormHelperText>
            {`Min price is ${voucherMinPrice} ETH`}
          </FormHelperText>
        </FormControl>
      </Stack>

      <FormControl
        mb={10}
        isRequired
        isInvalid={artDesc === '' && buttonClick ? true : false}
        fontFamily={theme.fonts.spaceMono}
        color={theme.colors.brand.darkCharcoal}
      >
        <FormLabel>Explain about the artwork</FormLabel>
        <StyledTextArea
          placeholder='The NFT description'
          onChange={(e) => setArtDesc(e.target.value)}
          value={artDesc}
        />
        <FormHelperText>
          {artDesc.length < 250
            ? `${250 - artDesc.length} characters left`
            : `Over character limit`}
        </FormHelperText>
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
            accept={ACCEPTED_IMAGE_FILE_FORMATS}
            onChange={handleImageUpload}
            style={{
              fontFamily: "'Poppins', sans-serif",
              position: 'relative',
              zIndex: '1'
            }}
          />
          <FormHelperText>
            {ACCEPTED_IMAGE_FILE_FORMATS.toString().replaceAll('image/', '')}
          </FormHelperText>
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
                ? ACCEPTED_AUDIO_FILE_FORMATS
                : ACCEPTED_VIDEO_FILE_FORMATS
            }
            style={{
              fontFamily: "'Poppins', sans-serif",
              position: 'relative',
              zIndex: '1'
            }}
          />
          <FormHelperText>
            {contentType === 'Audio'
              ? ACCEPTED_AUDIO_FILE_FORMATS.toString().replaceAll('audio/', '')
              : ACCEPTED_VIDEO_FILE_FORMATS.toString().replaceAll('video/', '')}
          </FormHelperText>
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
                fontFamily={theme.fonts.spaceMono}
              >
                Thank you!
              </AlertDialogHeader>

              <AlertDialogBody fontFamily={theme.fonts.spaceMono}>
                {/* <ChakraImage
                  crossOrigin='anonymous'
                  src={uriToHttp(imageUri)}
                  alt='minted nft'
                  fallbackSrc={`${POIGNART_BUCKET_BASE_URL}/${imageUri.replace(
                    'ipfs://',
                    ''
                  )}`}
                  height='auto'
                  width='100%'
                  mb='2rem'
                /> */}

                {artDesc}
                <Text
                  mt='.5rem'
                  color={theme.colors.brand.chineseSilver}
                  fontWeight='bold'
                  fontFamily={theme.fonts.spaceGrotesk}
                >{`Listing for ${artPrice} ETH`}</Text>
                <Text fontFamily={theme.fonts.spaceMono} mb='1rem'>
                  Spread the word about your contribution!
                </Text>
                <Textarea fontFamily={theme.fonts.spaceMono} isReadOnly>
                  {`I just donated new art for Ukraine on @PoignARTnft Buy this piece for ${artPrice} ETH — 100% of proceeds will be donated to Ukraine! 🇺🇦 #Unchain_Ukraine #StandWithUkraine ${
                    devMode
                      ? 'https://rinkeby.poign.art.io/voucher/' + signedTokenId
                      : 'https://poign.art.io/voucher/' + signedTokenId
                  }`}
                </Textarea>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  w='100%'
                  leftIcon={<TwitterIcon />}
                  fontFamily={theme.fonts.spaceMono}
                  colorScheme='twitter'
                  variant='solid'
                  textDecoration='none'
                  onClick={() => {
                    var start_text = 'https://twitter.com/intent/tweet?text=';
                    var generated_tweet = encodeURIComponent(
                      `I just donated new art for Ukraine on @PoignARTnft Buy this piece for ${artPrice} ETH — 100% of proceeds will be donated to Ukraine! 🇺🇦 #Unchain_Ukraine #StandWithUkraine`
                    );
                    var generated_url =
                      '&url=' +
                      encodeURIComponent(
                        devMode
                          ? 'https://rinkeby.poign.art/voucher/' + signedTokenId
                          : 'https://poign.art/voucher/' + signedTokenId
                      );
                    window.open(
                      start_text + generated_tweet + generated_url,
                      '_blank'
                    );
                  }}
                >
                  Tweet
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
    </Flex>
  );
};
