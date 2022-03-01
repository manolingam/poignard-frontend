import { useContext, useState } from 'react';
import {
  Flex,
  Box,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Skeleton
} from '@chakra-ui/react';

import styled from '@emotion/styled';

import { AppContext } from '../context/AppContext';

import RadioBox from './RadioBox';
import { theme } from '../themes/theme';
import { StyledPrimaryButton } from '../themes/buttons';

export const StyledInput = styled(Input)`
  background: 'white';
  border: 2px solid ${theme.colors.ukraine.azure};
  border-radius: 0;
`;

const ArtUploader = () => {
  const context = useContext(AppContext);
  const [image, setImage] = useState('');
  const [checkboxOption, setCheckboxOption] = useState(
    context.checkbox_option || 'Option 1'
  );

  const handleImageUpload = (event) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      function () {
        console.log(reader.result);
        setImage(reader.result);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <SimpleGrid
      columns='1'
      py='2rem'
      px={{ base: '1rem', lg: '4rem' }}
      mx='1rem'
      bg={theme.colors.brand.yellow}
    >
      <Flex direction='column'>
        <FormControl
          isRequired
          fontFamily={theme.fonts.poppins}
          color={theme.colors.ukraine.azure}
          mb={10}
        >
          <FormLabel>Input 1</FormLabel>
          <StyledInput
            placeholder='Input 1'
            onChange={context.inputChangeHandler}
            name='input_1'
            value={context.input_1}
          />
        </FormControl>
        <FormControl
          isRequired
          fontFamily={theme.fonts.poppins}
          color={theme.colors.ukraine.azure}
          mb={10}
        >
          <FormLabel>Input 2</FormLabel>
          <StyledInput
            placeholder='Input 2'
            onChange={context.inputChangeHandler}
            name='input_2'
            value={context.input_2}
          />
        </FormControl>
        <FormControl
          isRequired
          fontFamily={theme.fonts.poppins}
          color={theme.colors.ukraine.azure}
          mb={10}
        >
          <FormLabel as='legend'>Checkbox options</FormLabel>
          <RadioBox
            stack='horizontal'
            options={['Option 1', 'Option 2']}
            updateRadio={setCheckboxOption}
            name='checkbox_option'
            defaultValue={context.checkbox_option || checkboxOption}
            value={context.checkbox_option || checkboxOption}
          />
        </FormControl>
        <input
          type='file'
          accept='image/png, image/jpg, image/jpeg, image/webp'
          onChange={handleImageUpload}
          style={{ fontFamily: "'Poppins', sans-serif" }}
        />
        <br />
        {image ? (
          <Box
            bgImage={image}
            h='250px'
            w='100%'
            backgroundSize='contain'
            backgroundRepeat='no-repeat'
            backgroundPosition='center'
          ></Box>
        ) : (
          <Skeleton h='250px' />
        )}
      </Flex>
      <StyledPrimaryButton
        onClick={() => (window.location.href = '')}
        minW={{ base: 'auto' }}
        fontSize={{ base: '16px', lg: '18px' }}
        mt='1rem'
      >
        CALL TO ACTION
      </StyledPrimaryButton>
    </SimpleGrid>
  );
};

export default ArtUploader;
