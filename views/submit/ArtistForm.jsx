import { useContext, useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { AppContext } from '../../context/AppContext';

import StageButtonGroup from '../../shared/StageButtonGroup';
import { theme } from '../../themes/theme';

const StyledTextArea = styled(Textarea)`
  border: 2px solid ${theme.colors.brand.black};
  border-radius: 0;
`;

const StyledInput = styled(Input)`
  border: 2px solid ${theme.colors.brand.black};
  border-radius: 0;
`;

export const ArtistForm = () => {
  const context = useContext(AppContext);
  const [buttonClick, setButtonClickStatus] = useState(false);

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
          <FormLabel>Wanna share your email?</FormLabel>
          <StyledInput
            type='email'
            placeholder='Optional, but if you prefer email'
            onChange={context.inputChangeHandler}
            name='artist_email'
            value={context.artist_email}
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

      <StageButtonGroup
        updateStage={context.updateStage}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={
          context.artist_name && context.artist_bio && context.artist_discord
        }
      />
    </Flex>
  );
};
