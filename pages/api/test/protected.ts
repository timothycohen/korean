// protected API route

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function ProtectedRoute(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  } else {
    res.status(200).json({ message: 'Authenticated' });
    return;
  }
}
