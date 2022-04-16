// protected SSR route

import SignInOutBtn from 'lib/components/auth/SignInOutBtn';
import { type GetServerSidePropsContext } from 'next';
import { type Session } from 'next-auth';
import { getSession } from 'next-auth/react';

export default function ServerProtectedPage({ session }: { session: Session }): JSX.Element | null {
  if (typeof window === 'undefined') return null;

  if (session) {
    return (
      <>
        <h1>Protected Page</h1>
        <p>You can view this page because you are signed in.</p>
        <SignInOutBtn />
      </>
    );
  }
  return (
    <>
      <p>Access Denied</p>
      <SignInOutBtn />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{
  props: {
    session: Session | null;
  };
}> {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
