import { useState, useRef } from 'react';
import {
  Flex,
  Image as ChakraImage,
  Heading,
  Text,
  Box,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Link as ChakraLink
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { utils } from 'ethers';

import { CopyIcon } from '../../icons/CopyIcon';
import useWarnings from '../../hooks/useWarnings';
import { whitelistArtist } from '../../utils/requests';

import { theme } from '../../themes/theme';
import { WHITELIST_ADMINS } from '../../config';
import { Profile } from '../edit/Profile';

const StyledButton = styled(Button)`
  height: 25px;
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

const StyledInput = styled(Input)`
  border: 2px solid ${theme.colors.brand.black};
  border-radius: 0;
`;

const StyledCopy = styled(Text)`
  color: ${theme.colors.brand.black};
  font-family: ${theme.fonts.spaceGrotesk};
  margin-bottom: 0.5rem;
  font-size: 12px;
`;

export const ArtistInfo = ({
  artist,
  signer,
  signature,
  handleFetch,
  requireProfileEdit,
  setRequireProfileEdit
}) => {
  const [whitelistAddress, setWhitelistAddress] = useState('');

  const { triggerToast } = useWarnings();

  const [loading, setLoading] = useState(false);
  const [dialogStatus, setDialogStatus] = useState(false);
  const cancelRef = useRef();

  const onClose = async () => {
    setDialogStatus(false);
    setWhitelistAddress('');
  };

  const handleWhitelist = async () => {
    setLoading(true);

    if (!utils.isAddress(whitelistAddress)) {
      triggerToast('Please enter a valid address');
      setLoading(false);
      return;
    }

    try {
      const { data } = await whitelistArtist(whitelistAddress, signature);
      setDialogStatus(false);
      setWhitelistAddress('');
      triggerToast(
        `Artist will be whitelisted by ${new Date(
          data.response.status.nextDate
        ).toLocaleString()}`
      );
    } catch (err) {
      console.log(err);
      triggerToast('Duplicate address to whitelist');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setWhitelistAddress(e.target.value);
  };

  const copyToClipboard = (value) => {
    const tempInput = document.createElement('input');
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    triggerToast('Copied to clipboard!');
  };

  return (
    <>
      <Flex
        w='100%'
        direction='column'
        alignItems='center'
        justifyContent='center'
        pb='2rem'
        mb='1rem'
      >
        <ChakraImage
          src={`https://avatars.dicebear.com/api/croodles-neutral/${artist.name}.svg`}
          alt={artist.name}
          h='100px'
          w='auto'
          mr={{ base: '0', md: '1rem', lg: '1rem' }}
        ></ChakraImage>

        <Flex
          w='100%'
          h='100%'
          direction='column'
          alignItems='center'
          justifyContent='center'
        >
          <Flex direction='row'>
            <Heading
              fontFamily={theme.fonts.spaceGrotesk}
              color='rgb(32, 129, 226)'
            >
              {artist.name}{' '}
            </Heading>
            <Box h='15px' w='15px'>
              <span>
                <i className='fa-solid fa-circle-check'></i>
              </span>
            </Box>
          </Flex>

          <Text
            fontFamily={theme.fonts.spaceMono}
            color={theme.colors.brand.graniteGrey}
            maxW='60rem'
            textAlign='center'
            mb='1rem'
          >
            {artist.bio}
          </Text>

          <Flex w='100px' justifyContent='space-evenly' mb='1rem'>
            {artist.twitterHandle && (
              <ChakraLink
                href={`https://twitter.com/${artist.twitterHandle}`}
                isExternal
              >
                <Box h='15px' w='15px' cursor='pointer'>
                  <span>
                    <i className='fa-brands fa-twitter'></i>
                  </span>
                </Box>
              </ChakraLink>
            )}
            {artist.instagramHandle && (
              <ChakraLink
                href={`https://www.instagram.com/${artist.instagramHandle}`}
                isExternal
              >
                <Box h='15px' w='15px' cursor='pointer'>
                  <span>
                    <i className='fa-brands fa-instagram'></i>
                  </span>
                </Box>
              </ChakraLink>
            )}
            {artist.telegramHandle && (
              <ChakraLink
                href={` https://t.me/${artist.telegramHandle}`}
                isExternal
              >
                <Box h='15px' w='15px' cursor='pointer'>
                  <span>
                    <i className='fa-brands fa-telegram'></i>
                  </span>
                </Box>
              </ChakraLink>
            )}
          </Flex>

          <StyledCopy
            onClick={() => copyToClipboard(window.location.href)}
            cursor='pointer'
            _hover={{
              color: theme.colors.brand.black
            }}
          >
            Copy profile link <CopyIcon boxSize={4} />
          </StyledCopy>

          <Flex mt='1rem'>
            {WHITELIST_ADMINS.includes(signer) && artist.ethAddress === signer && (
              <StyledButton
                fontSize={{ base: '10px', lg: '12px' }}
                onClick={() => setDialogStatus(true)}
              >
                Whitelist Address
              </StyledButton>
            )}

            {artist.ethAddress === signer && !requireProfileEdit && (
              <StyledButton
                fontSize={{ base: '10px', lg: '12px' }}
                onClick={() => setRequireProfileEdit(true)}
                ml='1rem'
              >
                Edit Profile
              </StyledButton>
            )}
          </Flex>
        </Flex>
      </Flex>

      {requireProfileEdit && (
        <Profile
          setRequireProfileEdit={setRequireProfileEdit}
          handleFetch={handleFetch}
          artist={artist}
        />
      )}

      <AlertDialog
        isOpen={dialogStatus}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        closeOnOverlayClick={!loading}
        onOverlayClick={() => {
          loading && triggerToast('Wait for the address to be added.');
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
              Whitelist Address
            </AlertDialogHeader>

            <AlertDialogBody fontFamily={theme.fonts.spaceMono}>
              <FormControl
                isRequired
                fontFamily={theme.fonts.spaceMono}
                color={theme.colors.brand.darkCharcoal}
              >
                <FormLabel>New Artist Address</FormLabel>
                <StyledInput
                  placeholder='An eth address to whitelist'
                  onChange={handleInputChange}
                  name='whitelist_address'
                  value={whitelistAddress}
                />
                <FormHelperText mt='1rem'>
                  Note that it will take 24 hours for the address to be added to
                  the whitelist.
                </FormHelperText>
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                w='100%'
                mb='1rem'
                bg={theme.colors.brand.yellow}
                fontWeight='bold'
                fontFamily={theme.fonts.spaceGrotesk}
                isLoading={loading}
                onClick={handleWhitelist}
              >
                Whitelist Address
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
