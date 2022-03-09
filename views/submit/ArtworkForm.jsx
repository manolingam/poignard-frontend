/* eslint-disable react/no-children-prop */
import { useContext, useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Skeleton,
  Stack,
  Textarea,
  InputRightAddon,
  InputGroup
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

export const ArtworkForm = () => {
  const context = useContext(AppContext);
  const [buttonClick, setButtonClickStatus] = useState(false);
  const [image, setImage] = useState('');

  const handleImageUpload = (event) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      function () {
        console.log(reader.result);
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
          onChange={handleImageUpload}
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

      <StageButtonGroup
        updateStage={context.updateStage}
        setButtonClickStatus={setButtonClickStatus}
        stageRule={
          context.art_name &&
          context.art_price &&
          context.art_description &&
          image
        }
      />
    </Flex>
  );
};
