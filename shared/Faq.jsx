import React, { useContext } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { AppContext } from '../context/AppContext';
import { theme } from '../themes/theme';

import { explainerQA } from '../utils/constants';

const StyledPrimaryButton = styled(Button)`
  height: 50px;
  width: auto;
  font-family: ${theme.fonts.spaceGrotesk};
  text-transform: uppercase;
  border-radius: 3px;
  color: ${theme.colors.brand.black};
  background: ${theme.colors.brand.yellow};
  box-decoration-break: clone;
  padding-left: 24px;
  padding-right: 24px;
  &:hover {
    opacity: 0.6;
  }
`;

export const FAQ = () => {
  const context = useContext(AppContext);

  return (
    <Modal
      onClose={() => context.updateFaqModalStatus(false)}
      isOpen={context.faqModalStatus}
      isCentered
      scrollBehavior='inside'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>FAQs</ModalHeader>
        <ModalBody>
          <Accordion defaultIndex={[0]}>
            <AccordionItem fontFamily={theme.fonts.spaceGrotesk}>
              <AccordionButton textTransform='uppercase'>
                <Box
                  color={theme.colors.brand.darkCharcoal}
                  flex='1'
                  textAlign='left'
                >
                  Why NFTs?
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                color={theme.colors.brand.spanishGrey}
                fontFamily={theme.fonts.spaceGrotesk}
                pb={4}
              >
                An NFT is a badge of honor, a badge of inclusivity. NFTs have
                become a representation of one’s online identity and real-life
                views. For many, showcasing an amazing NFT art that is also
                directly supporting the needs of the Ukrainian people is a
                status symbol arguably much more prestigious than a lambo or a
                Picasso.
                <br />
                <br />
                NFTs are transparent, verifiable, and traceable. With NFTs, we
                can help artists make a name for themselves, collectors add a
                powerful status symbol, and the people of Ukraine get the help
                they so desperately need. Win-win-win!
                <br />
                <br />
                What a powerful cultural win! Putin is terrified of freedom of
                speeach and expression. So let’s hit him with just that -
                freedom of expression through art. Let’s show the people of
                Russia that they can artistically speak up to Putin’s regime
                while also helping Ukraine. Let’s show Putin that art cannot be
                silenced, that people cannot be silenced! NFTs are here to stay
                and make in impact to the world!
              </AccordionPanel>
            </AccordionItem>
            {explainerQA.map((item, index) => {
              return (
                <AccordionItem
                  key={index}
                  fontFamily={theme.fonts.spaceGrotesk}
                >
                  <AccordionButton textTransform='uppercase'>
                    <Box
                      color={theme.colors.brand.darkCharcoal}
                      flex='1'
                      textAlign='left'
                    >
                      {item.q}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel
                    color={theme.colors.brand.spanishGrey}
                    fontFamily={theme.fonts.spaceGrotesk}
                    pb={4}
                  >
                    {item.a}
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </ModalBody>
        <ModalFooter>
          <StyledPrimaryButton
            onClick={() => {
              context.updateFaqModalStatus(false);
            }}
          >
            Close
          </StyledPrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
