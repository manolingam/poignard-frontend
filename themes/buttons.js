import styled from '@emotion/styled';

import { Button } from '@chakra-ui/react';

import { theme } from './theme';

// --------- Buttons ------------

export const StyledPrimaryButton = styled(Button)`
  min-width: 160px;
  height: 50px;
  font-family: ${theme.fonts.spaceMono};
  text-transform: uppercase;
  color: white;
  border-radius: 2px;
  background: linear-gradient(94.89deg, #ffd700 0%, #0057b7 100%);
  padding-left: 24px;
  padding-right: 24px;
  &:hover {
    background: linear-gradient(94.89deg, #c9ad14 0%, #01428a 100%);
  }
`;

export const StyledSecondaryButton = styled(Button)`
  min-width: 160px;
  height: 50px;
  font-family: ${theme.fonts.poppins};
  text-transform: uppercase;
  border: 2px solid ${theme.colors.ukraine.azure};
  border-radius: 3px;
  color: ${theme.colors.ukraine.azure};
  background: white;
  box-decoration-break: clone;
  padding-left: 24px;
  padding-right: 24px;
  &:hover {
    background: black;
    opacity: 0.6;
  }
`;
