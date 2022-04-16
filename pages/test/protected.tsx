// protected CSR route

import SignInOutBtn from 'lib/components/auth/SignInOutBtn';
import { useSession } from 'next-auth/react';

export default function ProtectedPage(): JSX.Element {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (!session)
    return (
      <>
        <p>Not signed in</p>
        <SignInOutBtn />
      </>
    );
  return (
    <>
      <p>This is protected content</p>
      Signed in as {session.user?.email}
      <SignInOutBtn />
    </>
  );
}
