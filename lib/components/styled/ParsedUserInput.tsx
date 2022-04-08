import styled from '@emotion/styled';

const ParsedUserInput = styled('h2')(({ theme }) => ({
  fontSize: 'clamp(2rem, 1.25rem + 3.3333vw, 3rem)',
  fontWeight: '400',
  minHeight: '4.5rem',
  width: '100%',
  fontFamily: 'GowunDodum',
  color: theme.palette.gray['4'],
}));

export default ParsedUserInput;
