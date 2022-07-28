import { Color } from '$backend/color';
import type { RequestHandler } from '@sveltejs/kit';

export const getColors = (count: number) => {
  // don't start with white to prevent confusion
  let newColor = new Color().color;
  while (newColor.English === 'white') {
    newColor = new Color().color;
  }

  const colors = [new Color().color];

  for (let i = 0; i < count - 1; i++) {
    let newColor = new Color().color;
    // no duplicates
    while (newColor.hex === colors[i].hex) {
      newColor = new Color().color;
    }
    colors.push(newColor);
  }

  return colors;
};

export const GET: RequestHandler = ({ url }) => {
  const count = Math.max(1, Math.min(100, Number.parseInt(url.searchParams.get('count') ?? '100', 10)));
  return {
    status: 200,
    body: JSON.stringify(getColors(count)),
  };
};
