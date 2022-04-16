import {
  Flex,
  VStack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Link as ChakraLink
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';

const StyledHeading = styled(Heading)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.black};
  text-align: center;
  font-size: 35px;
  margin-bottom: 1rem;
`;

const StyledAccordianItem = styled(AccordionItem)`
  font-family: ${theme.fonts.spaceGrotesk};
  font-size: 18px;
`;

const StyledAccordianBox = styled(Box)`
  color: ${theme.colors.brand.darkCharcoal};
  font-size: 20px;
  flex: 1;
  text-align: 'left';
`;

const StyledAccordianPanel = styled(AccordionPanel)`
  color: ${theme.colors.brand.spanishGrey};
  font-family: ${theme.fonts.spaceMono};
  padding-bottom: 4;
`;

export const SectionFour = ({ unchainIncome }) => {
  return (
    <Flex
      id='section-four'
      direction='column'
      alignItems='center'
      justifyContent='center'
      px={{ base: '2rem', lg: '8rem' }}
      py={{ base: '2rem', lg: '4rem' }}
    >
      <VStack spacing={5} justifyContent='center'>
        <StyledHeading>Frequently Asked Questions</StyledHeading>

        <Accordion defaultIndex={[0]}>
          <StyledAccordianItem>
            <AccordionButton>
              <StyledAccordianBox>
                How can my organization partner with you?
              </StyledAccordianBox>
              <AccordionIcon />
            </AccordionButton>
            <StyledAccordianPanel>
              We would love to partner with supportive organizations around the
              world. Whatever you have in mind, please reach out to us through{' '}
              <ChakraLink
                textDecoration='underline'
                href='mailto:poignart.nft@gmail.com'
                isExternal
              >
                poignart.nft@gmail.com
              </ChakraLink>
              .
              <br />
              <br />
              Some ideas:
              <br />
              1. promoting PoignART on your website and social media.
              <br />
              2. running an incentive campaign with your community to raise
              awareness. <br />
              3. hosting an exhibit to promote artists and artwork on PoignART.
              which makes this free for you. <br />
            </StyledAccordianPanel>
          </StyledAccordianItem>

          <StyledAccordianItem>
            <AccordionButton>
              <StyledAccordianBox>Where will the money go?</StyledAccordianBox>
              <AccordionIcon />
            </AccordionButton>
            <StyledAccordianPanel>
              100% of proceeds go to{' '}
              <ChakraLink
                textDecoration='underline'
                href='https://unchain.fund/'
                isExternal
                color={theme.colors.brand.unchainFontGreen}
              >
                Unchain Fund
              </ChakraLink>
              , which has a list of approved non-government organizations (NGO)
              in Ukraine doing real-time frontline work. It is impossible for
              the PoignART team to touch any money, therefore, impossible for us
              to take a middleman’s cut. Every time an NFT is resold, 2.5% of
              the sale goes to Unchain Fund, which means that artwork from
              PoignART is a gift that keeps on giving!
            </StyledAccordianPanel>
          </StyledAccordianItem>

          <StyledAccordianItem>
            <AccordionButton>
              <StyledAccordianBox>What is Unchain Fund?</StyledAccordianBox>
              <AccordionIcon />
            </AccordionButton>
            <StyledAccordianPanel>
              Unchain is a charity project created by blockchain activists.
              Their goal is to break the chain of war, raising funds for
              humanitarian aid in Ukraine. Since the launch, they raised over{' '}
              {unchainIncome} till date. Donations to Unchain go to migrant
              support, food, psychological support, communication, protective
              equipment, medicine, and direct aid - not weapons. Check them out
              on{' '}
              <ChakraLink
                textDecoration='underline'
                href='https://cointelegraph.com/news/ukraine-has-received-37m-in-tracked-crypto-donations-so-far'
                isExternal
                color={theme.colors.brand.unchainFontGreen}
              >
                Cointelegraph
              </ChakraLink>{' '}
              and{' '}
              <ChakraLink
                textDecoration='underline'
                href='https://www.coindesk.com/layer2/2022/03/01/absolutely-surreal-inside-a-fund-raising-millions-in-crypto-for-besieged-ukraine/'
                isExternal
                color={theme.colors.brand.unchainFontGreen}
              >
                CoinDesk
              </ChakraLink>
              .
            </StyledAccordianPanel>
          </StyledAccordianItem>

          <StyledAccordianItem>
            <AccordionButton>
              <StyledAccordianBox>
                How can the press get in touch?
              </StyledAccordianBox>
              <AccordionIcon />
            </AccordionButton>
            <StyledAccordianPanel>
              Please get in touch through{' '}
              <ChakraLink
                textDecoration='underline'
                href='mailto:poignart.nft@gmail.com'
                isExternal
              >
                poignart.nft@gmail.com
              </ChakraLink>{' '}
              with the subject line “Press Request” and a brief description of
              your intent.
            </StyledAccordianPanel>
          </StyledAccordianItem>

          <StyledAccordianItem>
            <AccordionButton>
              <StyledAccordianBox>
                How can I volunteer with you?
              </StyledAccordianBox>
              <AccordionIcon />
            </AccordionButton>
            <StyledAccordianPanel>
              We need help with translations and multilingual community
              management, software development, design, outreach and partnership
              management, marketing, growth hacking, and more! If your heart is
              with the people of Ukraine, we will find a place for you to
              contribute and thrive. Join our{' '}
              <ChakraLink
                textDecoration='underline'
                href='https://discord.gg/qjPvUCakn3'
                isExternal
              >
                discord
              </ChakraLink>
              .
            </StyledAccordianPanel>
          </StyledAccordianItem>
        </Accordion>
      </VStack>
    </Flex>
  );
};
