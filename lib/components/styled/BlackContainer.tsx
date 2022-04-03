import styled from '@mui/system/styled';

const Container = styled('div')(({ theme }) => ({
  backgroundColor: 'black',
  borderRadius: '4px',
  margin: '0 auto',
  textAlign: 'center',
  boxShadow: `${theme.palette.gray['3']} 0px 1px 0px`,
}));

export default Container;
