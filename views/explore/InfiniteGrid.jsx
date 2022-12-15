/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
  SimpleGrid,
  Box,
  Text,
  Flex,
  NumberInput,
  NumberInputField,
  Button,
  Image as ChakraImage,
  Skeleton
} from '@chakra-ui/react';
import { utils } from 'ethers';
import Link from 'next/link';
import styled from '@emotion/styled';

import { theme } from '../../themes/theme';
import {
  VOUCHERS_PER_PAGE
  // POIGNART_BUCKET_BASE_URL
} from '../../config';
import { uriToHttp } from '../../utils/helpers';

const StyledTag = styled(Text)`
  max-width: 75%;
  color: ${theme.colors.brand.darkCharcoal};
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
`;

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

export const InfiniteGrid = ({ allVouchers, onlyMintable, contentType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentVouchers, setCurrentVouchers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const paginate = (filteredVouchers, pageNumber) => {
    pageNumber ? setCurrentPage(pageNumber) : null;
    const indexOfLastVoucher = currentPage * VOUCHERS_PER_PAGE;
    const indexOfFirstVoucher = indexOfLastVoucher - VOUCHERS_PER_PAGE;
    const currentVouchers = filteredVouchers.slice(
      indexOfFirstVoucher,
      indexOfLastVoucher
    );

    setCurrentVouchers(currentVouchers);
  };

  const filterVouchers = (page) => {
    const result = allVouchers.filter(filterVouchers);
    function filterVouchers(voucher) {
      if (contentType === 'All') return voucher;
      return voucher.contentType === contentType.toLowerCase();
    }

    setTotalPages(Math.ceil(result.length / VOUCHERS_PER_PAGE));
    paginate(result, page);
  };

  useEffect(() => {
    filterVouchers();
  }, [currentPage]);

  useEffect(() => {
    filterVouchers(1);
  }, [contentType]);

  return (
    <Flex w='100%' direction='column' alignItems='center' minH='45rem'>
      {currentVouchers.length !== 0 && (
        <SimpleGrid
          w='100%'
          columns={{ lg: 4, md: 2, base: 1 }}
          gridGap={{ base: 5, lg: 5 }}
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
                    mt='5px'
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
                      {onlyMintable
                        ? `${utils.formatEther(voucher.minPrice)} ETH`
                        : 'Sold'}
                    </Text>
                  </Flex>
                  <Flex direction='column' alignItems='center' mt='1rem'>
                    <Text fontWeight='bold'>{voucher.metadata.name}</Text>
                    <Text>By {voucher.createdBy.name}</Text>
                  </Flex>
                </Flex>
              </Link>
            );
          })}
        </SimpleGrid>
      )}

      {currentVouchers.length === 0 && (
        <StyledTag fontSize={{ base: '1rem', lg: '18px' }} m='auto'>
          No vouchers found for this filter.
        </StyledTag>
      )}

      {totalPages > 0 && (
        <Flex direction='row' mt='auto'>
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
          <NumberInput
            w='150px'
            mt='1rem'
            max={totalPages}
            onChange={(e) => {
              console.log(e);
              if (Number(e) > 0 && Number(e) <= totalPages) {
                setCurrentPage(Number(e));
              }
            }}
          >
            <NumberInputField
              h='100%'
              border='2px solid black'
              borderColor='black'
              borderRadius='3px'
              placeholder='Go to page'
            />
          </NumberInput>
          <StyledButton
            ml='1rem'
            disabled={currentPage + 1 > totalPages}
            onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
            _hover={{
              opacity: currentPage + 1 > totalPages ? 0.5 : 0.8
            }}
          >
            Next
          </StyledButton>
        </Flex>
      )}

      {totalPages > 0 && (
        <StyledTag mt='2rem'>
          Page {currentPage} of {totalPages}
        </StyledTag>
      )}
    </Flex>
  );
};
