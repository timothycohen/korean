import styled from '@mui/system/styled';

const Heading = styled('h1')(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

export default Heading;
