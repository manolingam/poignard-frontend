import { useRef, useContext } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Link
} from '@chakra-ui/react';
import styled from '@emotion/styled';

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

import { AppContext } from '../context/AppContext';

export const AlertModal = ({ alertTitle, uri, dialogStatus }) => {
  const context = useContext(AppContext);

  const onClose = () => context.updateAlertModalStatus();
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={dialogStatus}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize='25px'
            fontWeight='bold'
            fontFamily={theme.fonts.spaceGrotesk}
            color={theme.colors.brand.yellow}
          >
            {alertTitle}
          </AlertDialogHeader>

          <AlertDialogBody fontFamily={theme.fonts.spaceMono}>
            Your voucher has been signed and metadata has been uploaded to IPFS.
            You can view your metadata{' '}
            <Link textDecoration='underline' href={uri} isExternal>
              here.
            </Link>
          </AlertDialogBody>

          <AlertDialogFooter>
            <StyledButton
              className='dialog-button-cancel'
              ref={cancelRef}
              onClick={() => (window.location.href = '/')}
            >
              Back Home
            </StyledButton>
            <StyledButton
              className='dialog-button-select'
              onClick={() => {
                window.location.href = '/submit';
              }}
              ml={3}
            >
              Submit Another
            </StyledButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
