import { Flex, Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

import useWarnings from '../hooks/useWarnings';
import { theme } from '../themes/theme';

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

const StageButtonGroup = ({
  updateStage,
  setButtonClickStatus,
  stageRule,
  setData,
  dataValues,
  loadingText,
  isLoading = false,
  buttonText = 'Next'
}) => {
  const { triggerToast } = useWarnings();
  return (
    <Flex direction='row' justifyContent='space-between' alignItems='center'>
      <StyledButton
        mr='1rem'
        color={theme.colors.brand.black}
        onClick={() => updateStage('previous')}
      >
        Back
      </StyledButton>

      <StyledButton
        isLoading={isLoading}
        loadingText={loadingText}
        color={theme.colors.brand.white}
        bg={theme.colors.brand.black}
        onClick={async () => {
          if (stageRule) {
            setButtonClickStatus(false);
            let [param1, param2, param3] = dataValues ? dataValues : [];
            dataValues && setData(param1, param2, param3);
            buttonText === 'Next' && updateStage('next');
          } else {
            setButtonClickStatus(true);
            triggerToast('Please fill in all the required fields.');
          }
        }}
      >
        {buttonText}
      </StyledButton>
    </Flex>
  );
};

export default StageButtonGroup;
