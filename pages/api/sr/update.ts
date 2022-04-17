import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'db';
import { getSession } from 'next-auth/react';
import { SpacedRepetition } from '@prisma/client';

export default async function UpdateSR(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const session = await getSession({ req });
  const sr = req.body as SpacedRepetition;

  if (!session) return res.status(401).json({ message: 'Not authenticated' });
  if (sr.userId !== session.id) return res.status(403).json({ message: 'Not authorized' });

  try {
    await prisma.spacedRepetition.update({
      where: {
        id: sr.id,
      },
      data: sr,
    });
    return res.status(200).json({ message: 'Success' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
