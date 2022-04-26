import styled from '@mui/system/styled';

const Page = styled('div')(({ theme }) => ({
  display: 'grid',
  backgroundColor: 'black',
  color: theme.palette.primary.main,
}));

export default function Layout({ children }: { children: JSX.Element }): JSX.Element {
  return <Page>{children}</Page>;
}
