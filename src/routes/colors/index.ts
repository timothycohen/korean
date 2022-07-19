import { Color } from '$backend/color';
import { getColors } from '$api/colors';

/** @type {import('./__types/colors').RequestHandler} */
export async function GET() {
  return {
    status: 200,
    body: { colors: getColors(100), allColors: Color.all },
  };
}
