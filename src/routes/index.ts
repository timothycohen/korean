import { Color } from '$backend/color';

/** @type {import('./__types/colors').RequestHandler} */
export async function GET() {
  return {
    status: 200,
    body: { allColorHexes: Color.all.map(c => c.hex) },
  };
}
