import styled from '@mui/system/styled';
import { Color } from 'lib/color';
import { createURL } from './utils';

const createCoolLogo = (): string => {
  const colors = Color.all;
  const degrees = 360 / colors.length;
  let svg = `<svg alt="" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <path id="color" d="M 42.2,78.9 46.1,64.4 Q 50,65 53.88,64.48 L 57.7,78.9 Q 50,60 42.2,78.9Z" />
  </defs>
  `;
  colors.forEach((c, i): void => {
    svg += `  <use xlink:href="#color" transform="rotate(${i * degrees},50,50)" fill="${c.hex}"/>`;
  });
  svg += `</svg>`;
  return svg;
};

export const CoolLogo = styled('img')({
  height: '100%',
  width: '100%',
  backgroundImage: createURL(createCoolLogo()),
  backgroundSize: '160% 160%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});
