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

  const [artistName, setArtistName] = useState('');
  const [artistWebsite, setArtistWebsite] = useState('');
  const [artistBio, setArtistBio] = useState('');
  const [artistDiscord, setArtistDiscord] = useState('');
  const [artistTelegram, setArtistTelegram] = useState('');
  const [artistInsta, setArtistInsta] = useState('');
  const [artistTwitter, setArtistTwitter] = useState('');

  const { triggerToast } = useWarnings();

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const storeData = async () => {
    try {
      setLoading(true);
      setLoadingText('Storing offchain data..');
      const { data } = await submitArtistInfo(
        {
          name: artistName,
          website: artistWebsite,
          bio: artistBio,
          ethAddress: context.signerAddress,
          discordHandle: artistDiscord,
          telegramHandle: artistTelegram,
          instagramHandle: artistInsta,
          twitterHandle: artistTwitter
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
          isInvalid={artistName === '' && buttonClick ? true : false}
          color={theme.colors.brand.darkCharcoal}
          mb={10}
        >
          <FormLabel>What is your name?</FormLabel>
          <StyledInput
            placeholder='We mean the artist name'
            onChange={(e) => setArtistName(e.target.value)}
            value={artistName}
          />
        </FormControl>

        <FormControl
          isInvalid={context.artist_email === '' && buttonClick ? true : false}
          color={theme.colors.brand.darkCharcoal}
        >
          <FormLabel>Got a website?</FormLabel>
          <StyledInput
            placeholder='Optional, but if you have a website'
            onChange={(e) => setArtistWebsite(e.target.value)}
            value={artistWebsite}
          />
        </FormControl>
      </Stack>

      <FormControl
        mb={10}
        isRequired
        isInvalid={artistBio === '' && buttonClick ? true : false}
        color={theme.colors.brand.darkCharcoal}
      >
        <FormLabel>Tell us about yourself</FormLabel>
        <StyledTextArea
          placeholder='About yourself'
          onChange={(e) => setArtistBio(e.target.value)}
          value={artistBio}
        />
      </FormControl>

      <Stack
        mb={{ base: 10, lg: 0 }}
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: 0, lg: 5 }}
      >
        <FormControl
          isRequired
          isInvalid={artistDiscord === '' && buttonClick ? true : false}
          color={theme.colors.brand.darkCharcoal}
          mb={10}
        >
          <FormLabel>Your Discord handle?</FormLabel>
          <StyledInput
            placeholder="Include the unique identifier after the #, no '@'"
            onChange={(e) => setArtistDiscord(e.target.value)}
            value={artistDiscord}
          />
        </FormControl>
        <FormControl color={theme.colors.brand.darkCharcoal}>
          <FormLabel>Your Instagram?</FormLabel>
          <StyledInput
            placeholder="Optional, but we'll use it to show your work"
            onChange={(e) => setArtistInsta(e.target.value)}
            value={artistInsta}
          />
        </FormControl>
      </Stack>

      <Stack
        mb={{ base: 10, lg: 0 }}
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: 0, lg: 5 }}
      >
        <FormControl color={theme.colors.brand.darkCharcoal} mb={10}>
          <FormLabel>Got a Telegram?</FormLabel>
          <StyledInput
            placeholder='Optional as well..'
            onChange={(e) => setArtistTelegram(e.target.value)}
            value={artistTelegram}
          />
        </FormControl>
        <FormControl color={theme.colors.brand.darkCharcoal}>
          <FormLabel>What about Twitter?</FormLabel>
          <StyledInput
            placeholder="Optional, but we'll use it to show your work"
            onChange={(e) => setArtistTwitter(e.target.value)}
            value={artistTwitter}
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
            if (artistName && artistBio && artistDiscord) {
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
