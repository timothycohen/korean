import { styled } from '@mui/material/styles';

export const Input = styled('input')(({ theme }) => ({
  width: '100%',
  height: '3rem',
  fontSize: 'clamp(1rem, 5.25vw, 2.5rem)',
  padding: '0 1.25rem',
  textAlign: 'center',
  border: `2px solid ${theme.palette.primary['2']}`,

  '&:focus-visible': {
    border: '2px solid transparent',
    outline: `2px solid ${theme.palette.primary['4']}`,
  },
  borderRadius: '4px',
  fontFamily: 'BioRhyme',

  '&::-webkit-clear-button, &::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    display: 'none',
  },
}));

export const HangulInput = styled(Input)({
  fontFamily: 'GowunDodum',
});
