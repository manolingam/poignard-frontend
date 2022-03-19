import InfiniteScroll from 'react-infinite-scroll-component';
import { SimpleGrid, Box, Text } from '@chakra-ui/react';
import { utils } from 'ethers';
import Image from 'next/image';
import styled from '@emotion/styled';

import { uriToHttp } from '../../utils/helpers';

import { theme } from '../../themes/theme';

const StyledTag = styled(Text)`
  max-width: 75%;
  font-family: ${theme.fonts.spaceMono};
  color: ${theme.colors.brand.darkCharcoal};
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  margin: auto;
`;

const StyledTokenId = styled(Text)`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 5px 10px;
  background-color: ${theme.colors.brand.yellow};
  font-family: ${theme.fonts.spaceMono};
`;

export const InfiniteGrid = ({
  onlyMintable,
  currentVouchers,
  getMoreData,
  hasMoreVouchers,
  fullVouchersLength,
  setDialogData,
  setDialogStatus
}) => {
  return (
    <InfiniteScroll
      dataLength={fullVouchersLength}
      next={getMoreData}
      hasMore={hasMoreVouchers}
      loader={
        <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
          Scroll for more..
        </StyledTag>
      }
      endMessage={
        <StyledTag fontSize={{ base: '1rem', lg: '18px' }}>
          End of list :))
        </StyledTag>
      }
    >
      <SimpleGrid
        columns={{ lg: 3, md: 2, base: 1 }}
        gridGap={{ base: 5, lg: 10 }}
        w='100%'
      >
        {currentVouchers.map((voucher, index) => {
          return (
            <Box
              key={index}
              position='relative'
              cursor='pointer'
              _hover={{
                opacity: 0.7
              }}
              onClick={() => {
                setDialogData(voucher);
                setDialogStatus(true);
              }}
              mb='2rem'
            >
              <Image
                src={uriToHttp(voucher.metadata.image)}
                alt='minted nft'
                width='300px'
                height='100%'
                objectFit='cover'
              />

              <Box
                key={index}
                position='absolute'
                bottom='0'
                left='0'
                bg={theme.colors.brand.yellow}
                p='7px'
                h='35px'
                w='35px'
              >
                {voucher.contentType === 'audio' && (
                  <span>
                    <i className='fa-solid fa-music'></i>
                  </span>
                )}
                {voucher.contentType === 'video' && (
                  <span>
                    <i className='fa-solid fa-video'></i>
                  </span>
                )}
                {voucher.contentType === 'image' && (
                  <span>
                    <i className='fa-solid fa-image'></i>
                  </span>
                )}
              </Box>

              <StyledTokenId>
                {onlyMintable
                  ? `${utils.formatEther(voucher.minPrice)} ETH`
                  : 'Sold'}
              </StyledTokenId>
            </Box>
          );
        })}
      </SimpleGrid>
    </InfiniteScroll>
  );
};
