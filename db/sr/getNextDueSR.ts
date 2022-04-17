import { prisma } from 'db';
import { SpacedRepetition } from '@prisma/client';
import { SR } from 'lib/SR';

// todo make this a persistent queue instead of running this reducer for every new card

export default async function getNextDueSR(
  userIdOrUserSR: string | SpacedRepetition[]
): Promise<SpacedRepetition | null> {
  let userSR: SpacedRepetition[];

  if (typeof userIdOrUserSR === 'string') {
    userSR = await prisma.spacedRepetition.findMany({
      where: { userId: userIdOrUserSR },
    });
  } else {
    userSR = userIdOrUserSR;
  }
  const pot = SR.next(userSR.map(sr => SR.fromDBModel(sr)));
  if (!pot) return null;
  return pot.toDBModel();
}
