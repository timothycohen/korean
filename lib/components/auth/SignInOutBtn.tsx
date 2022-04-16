import { Button } from '@mui/material';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function SignOutBtn(): JSX.Element {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button
        type="button"
        variant="contained"
        onClick={(): void => {
          signOut();
        }}
      >
        Sign Out
      </Button>
    );
  }
  return (
    <Button
      type="button"
      variant="contained"
      onClick={(): void => {
        signIn();
      }}
    >
      Sign In
    </Button>
  );
}
