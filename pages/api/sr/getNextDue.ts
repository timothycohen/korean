import type { NextApiRequest, NextApiResponse } from 'next';
import { getNextDueSR } from 'db/sr';
import { getSession } from 'next-auth/react';

export type getNextDueBody = {
  userId: string;
};

export default async function getNextDue(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { userId } = req.body as getNextDueBody;
  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: 'Not authenticated' });
  if (userId !== session.id) return res.status(403).json({ message: 'Not authorized' });

  try {
    const sr = await getNextDueSR(userId);
    return res.status(200).json({ message: 'Success', sr });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
