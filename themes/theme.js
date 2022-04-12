import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  base: '320px',
  md: '620px',
  lg: '1020px'
});

const colors = {
  brand: {
    brightGrey: '#EEEEEE',
    chineseSilver: '#CCCCCC',
    spanishGrey: '#999999',
    graniteGrey: '#666666',
    darkCharcoal: '#333333',
    black: '#000000',
    white: '#FFFFFF',
    yellow: '#ffd700',
    yellowLight: '#fff8d1',
    unchainFontGreen: '#7fc23c',
    unchainBgGreen: '#b7f66a',
    unchainBgBlack: '#0f212b'
  }
};

const fonts = {
  poppins: "'Poppins', sans-serif",
  spaceGrotesk: "'Space Grotesk', sans-serif",
  spaceMono: "'Space Mono', monospace"
};

export const theme = extendTheme({
  colors,
  fonts,
  breakpoints
});
