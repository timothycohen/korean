import { prisma } from 'db';
import { SR } from 'lib/SR';
import { allCounters } from 'lib/counters';
import { SpacedRepetition } from '@prisma/client';
import { Optional } from 'utility-types';

export default async function addAllCountersToUser(userId: string): Promise<SpacedRepetition[]> {
  const defaultSR = new SR().toDBModel() as Optional<SpacedRepetition, 'id'>;
  // add each counter under the user's ID
  defaultSR.userId = userId;
  // let prisma create the sr.id
  delete defaultSR.id;

  console.log('🌱 adding counters to user', userId);

  // add the counter data ids
  const data: Omit<SpacedRepetition, 'id'>[] = Object.values(allCounters).map(
    ({ id }): Omit<SpacedRepetition, 'id'> => ({
      ...defaultSR,
      dataId: id,
    })
  );

  return Promise.all(data.map(d => prisma.spacedRepetition.create({ data: d })));
}
