import { useState, useEffect, useContext } from 'react';
import {
  Flex,
  SimpleGrid,
  Button,
  Text,
  Skeleton,
  Heading
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { utils } from 'ethers';

import { AppContext } from '../../context/AppContext';

import { fetchVouchers } from '../../utils/requests';
import { theme } from '../../themes/theme';

const StyledTag = styled(Text)`
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.darkCharcoal};
  text-align: justify;
  text-transform: uppercase;
  font-weight: bold;
  margin: auto;
`;

const StyledButton = styled(Button)`
  height: 50px;
  width: 100%;
  font-family: ${theme.fonts.spaceGrotesk};
  text-transform: uppercase;
  border: 2px solid ${theme.colors.brand.black};
  border-radius: 3px;
  color: ${theme.colors.brand.black};
  background: white;
  box-decoration-break: clone;
  padding-left: 24px;
  padding-right: 24px;
  &:hover {
    opacity: 0.6;
  }
`;

const StyledTokenId = styled(Heading)`
  position: absolute;
  padding: 5px 10px;
  background-color: ${theme.colors.brand.yellow};
  font-family: ${theme.fonts.spaceMono};
`;

const StyledTokenDescription = styled(Text)`
  font-family: ${theme.fonts.spaceGrotesk};
  color: ${theme.colors.brand.graniteGrey};
  margin-bottom: 1rem;
`;

export const AllVouchers = () => {
  const context = useContext(AppContext);
  const [fetched, setFetched] = useState(false);

  const handleFetch = async () => {
    const { data } = await fetchVouchers(context.signature);
    context.setDbData({ db_vouchers: data.data.vouchers });
    setFetched(true);
  };

  useEffect(() => {
    if (context.signature) {
      handleFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.signature]);

  return (
    <>
      {!context.signature && (
        <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
          Connect wallet to view vouchers.
        </StyledTag>
      )}
      {!fetched && context.signature && (
        <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
          Fetching vouchers...
        </StyledTag>
      )}
      {context.db_vouchers && context.signature && (
        <SimpleGrid
          columns={{ lg: 3, md: 2, base: 1 }}
          px={{ base: '1rem', lg: '4rem' }}
          mb='1rem'
        >
          {context.db_vouchers.map((voucher, index) => {
            return (
              <Flex direction='column' key={index} position='relative'>
                <Skeleton height='250px' width='100%' mb='2rem' />
                <StyledTokenId>{voucher.tokenID}</StyledTokenId>
                <StyledTokenDescription>
                  Description of the NFT
                </StyledTokenDescription>
                <StyledButton
                  minW={{ base: 'auto' }}
                  fontSize={{ base: '16px', lg: '18px' }}
                >
                  {`Mint for ${utils.formatEther(voucher.minPrice)} ETH`}
                </StyledButton>
              </Flex>
            );
          })}
        </SimpleGrid>
      )}
    </>
  );
};
