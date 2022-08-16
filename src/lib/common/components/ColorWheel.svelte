<script lang="ts">
  export let allColorHexes: string[];
  export let colorPath = 'M 42.2,78.9 Q 50,50 53.88,64.48 L 57.7,80 Q 50,68 42,78.9Z';

  // better way to represent valid config states in TS?
  type UserPicked = { hex: string; addToCenter?: boolean; removeFromOuter?: boolean; closeOuterGap?: boolean };
  type Picked = Required<UserPicked>;
  const defaultNonePicked: Picked = { hex: 'none', addToCenter: false, removeFromOuter: false, closeOuterGap: false };
  const defaultPicked: Picked = { hex: '#FFFFFF', addToCenter: false, removeFromOuter: true, closeOuterGap: false };
  export let picked: string | UserPicked = defaultNonePicked;

  const guardConfig = (userPicked: string | UserPicked): Picked => {
    let picked = defaultNonePicked;

    if (typeof userPicked === 'string') {
      if (!allColorHexes.includes(userPicked)) {
        if (userPicked !== 'none') console.error('Invalid picked color for Color Wheel. Using none default');
      } else picked = { ...defaultPicked, hex: userPicked };
    } else {
      if (!allColorHexes.includes(userPicked.hex)) {
        if (userPicked.hex !== 'none') console.error('Invalid picked color for Color Wheel. Using none default');
      } else picked = { ...defaultPicked, ...userPicked };
    }

    if (!picked.removeFromOuter && picked.closeOuterGap === true) {
      console.error('Cannot close outer gap without removing from outer. Setting close outer gap to false.');
      picked.closeOuterGap = false;
    }

    return picked;
  };

  const createColorWheelSVG = (allColorHexes: string[], picked: Picked, colorPath: string): string => {
    const degrees = 360 / (allColorHexes.length - (picked.closeOuterGap ? 1 : 0));

    let svg = `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <path id="color" d="${colorPath}"/>
  </defs>
  <g transform="translate(-20, -20)">`;

    let pullClosedDegrees = 0;
    allColorHexes.forEach((hex, i): void => {
      if (hex !== picked.hex) {
        svg += `\n\t<use xlink:href="#color" transform="rotate(${
          i * degrees + pullClosedDegrees
        },50,50)" fill="${hex}"/>`;
        return;
      }

      if (picked.closeOuterGap) pullClosedDegrees = -degrees;

      if (!picked.removeFromOuter)
        svg += `\n\t<use xlink:href="#color" transform="rotate(${
          i * degrees + pullClosedDegrees
        },50,50)" fill="${hex}"/>`;

      if (picked.addToCenter) {
        if (hex === '#FFFFFF') {
          svg += `\n\t<circle cx="50" cy="50" r="9" fill="${hex}" stroke="black" stroke-width=".03" stroke-dasharray="2,2"/>`;
        } else {
          svg += `\n\t<circle cx="50" cy="50" r="9" fill="${hex}"/>`;
        }
      }
    });

    svg += `\n\t</g>\n</svg>`;

    return svg;
  };
</script>

<div class="colorWheel">
  {@html createColorWheelSVG(allColorHexes, guardConfig(picked), colorPath)}
  <div class="overlay"><slot /></div>
</div>

<style>
  .colorWheel {
    height: 100%;
    width: 100%;
  }
  .overlay {
    height: 100%;
    width: 100%;
    position: relative;
    top: -100%;
  }
</style>
