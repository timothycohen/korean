import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import styled from '@mui/system/styled';

const TopBar = styled('div')({
  padding: '.5rem 1rem',
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: '1fr',
  gridAutoFlow: 'column',
  alignItems: 'baseline',
});

const Main = styled('div')({
  display: 'grid',
  placeItems: 'center',
  rowGap: '2rem',
});

export default function BottomDrawer({
  isOpen,
  setIsOpen,
  children,
  labels = [],
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  labels?: string[];
}): JSX.Element {
  return (
    <Drawer anchor="bottom" open={isOpen} /* close on outside clicks*/ onClose={() => setIsOpen(false)}>
      <Box sx={{ height: '100%', padding: '1rem', backgroundColor: `secondary.5` }} role="presentation">
        <TopBar>
          <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: '700', color: 'secondary.1' }}>
            {labels[0] ?? 'Settings'}
          </Typography>
          <Button
            sx={{
              fontSize: '1rem',
              color: 'secondary.1',
            }}
            onClick={() => setIsOpen(false)}
          >
            {labels[1] ?? 'Close'}
          </Button>
        </TopBar>
        <Divider sx={{ marginBottom: '1rem' }} />
        <Main>{children}</Main>
      </Box>
    </Drawer>
  );
}
