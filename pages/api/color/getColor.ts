import type { NextApiRequest, NextApiResponse } from 'next';
import { Color } from 'lib/color';

export { type Color };

export default async function getColor(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    const { oldColorHex } = req.body as { oldColorHex: string | undefined };

    let color = new Color();

    while (color.hex === oldColorHex) {
      color = new Color();
    }

    return res.status(200).json({ message: 'Success', color });
  } else if (req.method === 'GET') {
    let color = new Color();
    let nextColor = new Color();

    // don't show either white or one color twice to prevent confusion
    while (color.hex === '#FFFFFF' || color.hex === nextColor.hex) {
      color = new Color();
    }

    return res.status(200).json({ message: 'Success', color, nextColor });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
