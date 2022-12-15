/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
  SimpleGrid,
  Box,
  Text,
  Flex,
  Button,
  Skeleton,
  Image as ChakraImage
} from '@chakra-ui/react';
import { utils } from 'ethers';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';
import {
  VOUCHERS_PER_PAGE
  // POIGNART_BUCKET_BASE_URL
} from '../../config';
import Link from 'next/link';
import { uriToHttp } from '../../utils/helpers';

const StyledButton = styled(Button)`
  height: 50px;
  text-transform: uppercase;
  border-radius: 3px;
  box-decoration-break: clone;
  color: ${theme.colors.brand.white};
  background-color: ${theme.colors.brand.black};
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 1rem;
`;

export const InfiniteGrid = ({ allVouchers, totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentVouchers, setCurrentVouchers] = useState([]);

  const paginate = () => {
    const indexOfLastVoucher = currentPage * VOUCHERS_PER_PAGE;
    const indexOfFirstVoucher = indexOfLastVoucher - VOUCHERS_PER_PAGE;
    const currentVouchers = allVouchers.slice(
      indexOfFirstVoucher,
      indexOfLastVoucher
    );

    setCurrentVouchers(currentVouchers);
  };

  useEffect(() => {
    paginate();
  }, [currentPage]);

  return (
    <Flex direction='column' alignItems='center'>
      <SimpleGrid
        columns={{ lg: 4, md: 2, base: 1 }}
        gridGap={{ base: 5, lg: 10 }}
        w='100%'
      >
        {currentVouchers.map((voucher, index) => {
          return (
            <Link key={index} href={`/voucher/${voucher.tokenID}`} passHref>
              <Flex
                minH='300px'
                w='100%'
                direction='column'
                position='relative'
                cursor='pointer'
                boxShadow='-6px -6px 9px #e0e0e0,
                  6px 6px 9px #fcfcfc'
                animation='shadowFadeOut .4s'
                _hover={{
                  transform: 'scale(0.98)',
                  boxShadow:
                    'inset -6px -6px 9px #e0e0e0, inset 6px 6px 9px #fcfcfc',
                  animation: 'shadowFadeIn .4s'
                }}
                mb='2rem'
                pb='10px'
                borderRadius='5px'
                overflow='hidden'
              >
                <ChakraImage
                  crossOrigin='anonymous'
                  // src={`${POIGNART_BUCKET_BASE_URL}/${voucher.metadata.image.replace(
                  //   'ipfs://',
                  //   ''
                  // )}`}
                  src={uriToHttp(voucher.metadata.image)}
                  fallback={<Skeleton h='200px' w='100%' />}
                  alt='minted nft'
                  width='100%'
                  height='200px'
                  objectFit='cover'
                />

                <Flex
                  color={theme.colors.brand.blue}
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Box p='7px' h='35px' w='35px'>
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
                  <Text p='5px 10px' fontWeight='bold'>
                    {!voucher.minted
                      ? `${utils.formatEther(voucher.minPrice)} ETH`
                      : 'Sold'}
                  </Text>
                </Flex>
                <Flex direction='column' alignItems='center' mt='1rem'>
                  {' '}
                  <Text fontWeight='bold'>{voucher.metadata.name}</Text>
                </Flex>
              </Flex>
            </Link>
          );
        })}
      </SimpleGrid>
      <Flex direction='row'>
        <StyledButton
          mr='1rem'
          disabled={currentPage - 1 == 0}
          onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
          _hover={{
            opacity: currentPage - 1 == 0 ? 0.5 : 0.8
          }}
        >
          Prev
        </StyledButton>
        <StyledButton
          disabled={currentPage + 1 > totalPages}
          onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
          _hover={{
            opacity: currentPage + 1 > totalPages ? 0.5 : 0.8
          }}
        >
          Next
        </StyledButton>
      </Flex>
    </Flex>
  );
};
