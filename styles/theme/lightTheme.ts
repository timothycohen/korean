import { createTheme } from '@mui/material/styles';

// Color palette: https://paletton.com/#uid=73V1-0k9OsO2vM+5N-uerodiMjV

const theme = {
  palette: {
    mode: 'light',
    complement: {
      main: '#353C6D',
      1: '#CDCFDD',
      2: '#9EA1BB',
      3: '#74799E',
      4: '#515785',
      5: '#353C6D',
    },
    secondary: {
      main: '#D392A1',
      1: '#F6E3E7',
      2: '#EDC2CC',
      3: '#D392A1',
      4: '#B26174',
      5: '#923C50',
    },
    primary: {
      main: '#FFF2D1',
      1: '#FFF9EB',
      2: '#FFF2D1',
      3: '#E6D29F',
      4: '#C1A96A',
      5: '#9F8541',
    },
    sec: {
      main: '#A2C98B',
      1: '#E5F1DE',
      2: '#CAE4BA',
      3: '#A2C98B',
      4: '#79A95C',
      5: '#578B39',
    },
    gray: {
      main: '#2e2e2e',
      1: '#ffffff',
      2: '#f5f5f5',
      3: '#c9c9c9',
      4: '#414141',
      5: '#2e2e2e',
      6: '#000000',
    },
    steel: {
      main: '#E5E7EB',
      1: '#E5E7EB',
      2: '#D1D5DB',
      3: '#6B7280',
    },
  },
  typography: {
    fontFamily: [
      'BioRhyme',
      'SpaceMono',
      'Arial',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
} as const;

export type CustomTheme = {
  [Key in keyof typeof theme]: typeof theme[Key];
};

export default createTheme(theme);

declare module '@mui/material/styles/createTheme' {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}
