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
import { editArtistInfo } from '../../utils/requests';
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

export const Profile = ({ setRequireProfileEdit, handleFetch, artist }) => {
  const context = useContext(AppContext);

  const [name, setName] = useState(artist.name);
  const [website, setWebsite] = useState(artist.website);
  const [bio, setBio] = useState(artist.bio);
  const [discord, setDiscord] = useState(artist.discordHandle);
  const [telegram, setTelegram] = useState(artist.telegramHandle);
  const [instagram, setInstagram] = useState(artist.instagramHandle);
  const [twitter, setTwitter] = useState(artist.twitterHandle);

  const { triggerToast } = useWarnings();

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const storeData = async () => {
    try {
      setLoading(true);
      setLoadingText('Storing offchain data..');

      const { data } = await editArtistInfo(
        {
          name: name,
          website: website,
          bio: bio,
          ethAddress: context.signerAddress,
          discordHandle: discord,
          telegramHandle: telegram,
          instagramHandle: instagram,
          twitterHandle: twitter
        },
        context.signature
      );
      await handleFetch();
      context.setDbData({ db_artist: data });
      setRequireProfileEdit(false);
      triggerToast('Successfully updated your profile!');
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
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
          mb={10}
        >
          <FormLabel>What is your name?</FormLabel>
          <StyledInput
            placeholder='We mean the artist name'
            onChange={(e) => setName(e.target.value)}
            name='artist_name'
            value={name}
          />
        </FormControl>

        <FormControl
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
        >
          <FormLabel>Got a website?</FormLabel>
          <StyledInput
            placeholder='Optional, but if you have a website'
            onChange={(e) => setWebsite(e.target.value)}
            name='artist_website'
            value={website}
          />
        </FormControl>
      </Stack>

      <FormControl
        mb={10}
        isRequired
        fontFamily={theme.fonts.spaceMono}
        color={theme.colors.brand.darkCharcoal}
      >
        <FormLabel>Tell us about yourself</FormLabel>
        <StyledTextArea
          placeholder='About yourself'
          onChange={(e) => setBio(e.target.value)}
          name='artist_bio'
          value={bio}
        />
      </FormControl>

      <Stack
        mb={{ base: 10, lg: 0 }}
        direction={{ base: 'column', lg: 'row' }}
        spacing={{ base: 0, lg: 5 }}
      >
        <FormControl
          isRequired
          fontFamily={theme.fonts.spaceMono}
          color={theme.colors.brand.darkCharcoal}
          mb={10}
        >
          <FormLabel>Your Discord handle?</FormLabel>
          <StyledInput
            placeholder="Include the unique identifier after the #, no '@'"
            onChange={(e) => setDiscord(e.target.value)}
            name='artist_discord'
            value={discord}
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
            onChange={(e) => setInstagram(e.target.value)}
            value={instagram}
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
            onChange={(e) => setTelegram(e.target.value)}
            value={telegram}
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
            onChange={(e) => setTwitter(e.target.value)}
            value={twitter}
          />
        </FormControl>
      </Stack>

      <Flex direction='row' justifyContent='space-between' alignItems='center'>
        <StyledButton
          mr='1rem'
          color={theme.colors.brand.black}
          onClick={() => setRequireProfileEdit(false)}
        >
          Cancel
        </StyledButton>

        <StyledButton
          color={theme.colors.brand.white}
          bg={theme.colors.brand.black}
          isLoading={loading}
          loadingText={loadingText}
          onClick={() => {
            if (name && bio && discord) {
              handleSubmit();
            } else {
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
