import { useContext, useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Button
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { AppContext } from '../../context/AppContext';
import { submitArtistInfo } from '../../utils/requests';
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

export const ArtistForm = () => {
  const context = useContext(AppContext);
  const [buttonClick, setButtonClickStatus] = useState(false);

  const { triggerToast } = useWarnings();

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const storeData = async () => {
    try {
      setLoading(true);
      setLoadingText('Storing offchain data..');
      const { data } = await submitArtistInfo(
        {
          name: context.artist_name,
          website: context.artist_website,
          bio: context.artist_bio,
          ethAddress: context.signerAddress,
          discordHandle: context.artist_discord,
          telegramHandle: context.artist_telegram,
          instagramHandle: context.artist_insta,
          twitterHandle: context.artist_twitter
        },
        context.signature
      );
      context.setDbData({ db_artist: data });
      context.updateStage(context.stage + 1);
    } catch (err) {
      console.log(err);
      triggerToast('Failed to store data offchain.');
    }

    setLoading(false);
  };

  const handleSubmit = async () => {
    await storeData();
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
          isInvalid={context.artist_name === '' && buttonClick ? true : false}
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
          mb={10}
        >
          <FormLabel>What is your name?</FormLabel>
          <StyledInput
            placeholder='We mean the artist name'
            onChange={context.inputChangeHandler}
            name='artist_name'
            value={context.artist_name}
          />
        </FormControl>

        <FormControl
          isInvalid={context.artist_email === '' && buttonClick ? true : false}
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
        >
          <FormLabel>Got a website?</FormLabel>
          <StyledInput
            placeholder='Optional, but if you have a website'
            onChange={context.inputChangeHandler}
            name='artist_website'
            value={context.artist_website}
          />
        </FormControl>
      </Stack>

      <FormControl
        mb={10}
        isRequired
        isInvalid={context.artist_bio === '' && buttonClick ? true : false}
        fontFamily={theme.fonts.spaceMono}
        color={theme.colors.brand.darkCharcoal}
      >
        <FormLabel>Tell us about yourself</FormLabel>
        <StyledTextArea
          placeholder='About yourself'
          onChange={context.inputChangeHandler}
          name='artist_bio'
          value={context.artist_bio}
        />
      </FormControl>

      <Stack
        mb={{ base: 10, lg: 0 }}
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: 0, lg: 5 }}
      >
        <FormControl
          isRequired
          isInvalid={
            context.artist_discord === '' && buttonClick ? true : false
          }
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
          mb={10}
        >
          <FormLabel>Your Discord handle?</FormLabel>
          <StyledInput
            placeholder="Include the unique identifier after the #, no '@'"
            onChange={context.inputChangeHandler}
            name='artist_discord'
            value={context.artist_discord}
          />
        </FormControl>
        <FormControl
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
        >
          <FormLabel>Your Instagram?</FormLabel>
          <StyledInput
            placeholder="Optional, but we'll use it to show your work"
            name='artist_insta'
            onChange={context.inputChangeHandler}
            value={context.artist_insta}
          />
        </FormControl>
      </Stack>

      <Stack
        mb={{ base: 10, lg: 0 }}
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: 0, lg: 5 }}
      >
        <FormControl
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
          mb={10}
        >
          <FormLabel>Got a Telegram?</FormLabel>
          <StyledInput
            placeholder='Optional as well..'
            name='artist_telegram'
            onChange={context.inputChangeHandler}
            value={context.artist_telegram}
          />
        </FormControl>
        <FormControl
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
        >
          <FormLabel>What about Twitter?</FormLabel>
          <StyledInput
            placeholder="Optional, but we'll use it to show your work"
            name='artist_twitter'
            onChange={context.inputChangeHandler}
            value={context.artist_twitter}
          />
        </FormControl>
      </Stack>

      <Flex direction='row' justifyContent='space-between' alignItems='center'>
        <StyledButton
          mr='1rem'
          color={theme.colors.brand.black}
          onClick={() => context.updateStage(context.stage - 1)}
        >
          Back
        </StyledButton>

        <StyledButton
          color={theme.colors.brand.white}
          bg={theme.colors.brand.black}
          isLoading={loading}
          loadingText={loadingText}
          onClick={() => {
            if (
              context.artist_name &&
              context.artist_bio &&
              context.artist_discord
            ) {
              setButtonClickStatus(false);
              handleSubmit();
            } else {
              setButtonClickStatus(true);
              triggerToast('Please fill in all the required fields.');
            }
          }}
        >
          Submit
        </StyledButton>
      </Flex>
    </Flex>
  );
};
