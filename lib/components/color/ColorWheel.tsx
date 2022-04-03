import styled from '@mui/system/styled';
import { Color } from 'lib/color';
import { createURL } from './utils';

const createColorWheel = (pickedHex: string = 'none'): string => {
  const colors = Color.all;
  const degrees = 360 / (colors.length - 1);
  let svg = `<svg alt="" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <path id="color" d="M 42.2,78.9 Q 50,50 53.88,64.48 L 57.7,80 Q 50,68 42,78.9Z" />
  </defs>
  `;
  colors.forEach((c, i): void => {
    if (c.hex === pickedHex) {
      if (c.English === 'white') {
        svg += `  <circle cx="50%" cy="50%" r="8" fill="${c.hex}" stroke="black" stroke-width=".03" stroke-dasharray="2,2"/>`;
      } else {
        svg += `  <circle cx="50%" cy="50%" r="8" fill="${c.hex}"/>`;
      }
    } else {
      svg += `  <use xlink:href="#color" transform="rotate(${i * degrees},50,50)" fill="${c.hex}"/>`;
    }
  });
  svg += `</svg>`;
  return svg;
};

export const ColorWheel = styled('div')(({ hex }: { hex?: string }) => ({
  height: '100%',
  width: '100%',
  backgroundImage: createURL(createColorWheel(hex)),
  backgroundSize: '160% 160%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));
