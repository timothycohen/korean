import Cards from 'lib/components/cards/cards';
import SignInOutBtn from 'lib/components/auth/SignInOutBtn';
import { type GetServerSidePropsContext } from 'next';
import { type Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { prisma } from 'db';
import addAllCountersToUser from 'db/sr/addAllCountersToUser';
import { getNextDueSR } from 'db/sr';
import { SpacedRepetition } from '@prisma/client';

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{
  props: {
    session: Session | null;
    SRPO?: SpacedRepetition;
  };
}> {
  const session = await getSession(context);

  if (!session) return { props: { session } };

  // Get all spaced repetition data associated with the user
  let userSR = await prisma.spacedRepetition.findMany({
    where: { userId: session.id as string },
  });

  // If the user has no SR, create them and add it to the database under their user ID
  if (!userSR.length) {
    userSR = await addAllCountersToUser(session.id as string);
  }

  const nextCard = await getNextDueSR(userSR);

  if (!nextCard) return { props: { session } };

  return {
    props: {
      session: session,
      SRPO: nextCard,
    },
  };
}

export default function CardsPage({
  session,
  SRPO,
}: {
  session: Session | null;
  SRPO?: SpacedRepetition;
}): JSX.Element | null {
  if (typeof window === 'undefined') return null;

  if (session) return <Cards sr={SRPO} />;
  return (
    <>
      <p>
        The Cards app uses{' '}
        <Link href="https://en.wikipedia.org/wiki/Spaced_repetition">spaced repetition</Link>.
      </p>
      <p>Sign in to get started!</p>
      <SignInOutBtn />
    </>
  );
}
