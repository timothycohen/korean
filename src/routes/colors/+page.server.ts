import { Color } from '$backend/color';
import { getColors } from '$api/colors/+server';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return { colors: getColors(100), allColors: Color.all };
}
