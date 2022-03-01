import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  base: '320px',
  md: '620px',
  lg: '1020px'
});

const colors = {
  ukraine: {
    yellow: '#ffd700',
    azure: '#0057b7'
  },
  brand: {
    black: '#1A1A40',
    yellow: '#fff8d1'
  }
};

const fonts = {
  poppins: "'Poppins', sans-serif"
};

export const theme = extendTheme({
  colors,
  fonts,
  breakpoints
});
