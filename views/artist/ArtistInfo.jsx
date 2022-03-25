import { useState, useRef } from 'react';
import {
  SimpleGrid,
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
  Input
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { utils } from 'ethers';

import useWarnings from '../../hooks/useWarnings';
import { whitelistArtist } from '../../utils/requests';

import { theme } from '../../themes/theme';

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

export const ArtistInfo = ({ artist, signer, signature }) => {
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
      await whitelistArtist(whitelistAddress, signature);
      setDialogStatus(false);
      setWhitelistAddress('');
      triggerToast('Address added for whitelisting.');
    } catch (err) {
      console.log(err);
      triggerToast('Error whitelisting address.');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setWhitelistAddress(e.target.value);
  };

  return (
    <>
      <SimpleGrid
        columns={{ lg: 2, md: 2, base: 1 }}
        gridGap={{ base: 5, lg: 10 }}
        pb='2rem'
        mb='1rem'
        placeItems='center'
      >
        <ChakraImage
          src={`https://avatars.dicebear.com/api/croodles-neutral/${artist.name}.svg`}
          alt={artist.name}
          h='100%'
          w='auto'
        ></ChakraImage>

        <Flex
          h='100%'
          direction='column'
          alignItems={{ base: 'center', lg: 'flex-start' }}
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

          {artist.ethAddress === signer && (
            <StyledButton
              fontSize={{ base: '10px', lg: '12px' }}
              onClick={() => setDialogStatus(true)}
            >
              Whitelist Address
            </StyledButton>
          )}
        </Flex>
      </SimpleGrid>
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
