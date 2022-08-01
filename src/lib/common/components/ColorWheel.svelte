<script lang="ts">
  export let pickedHex = 'none';
  export let allColorHexes: string[];

  const createColorWheelSVG = (pickedHex = 'none', allColorHexes: string[]): string => {
    const degrees = 360 / (allColorHexes.length - 1);

    let svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <path id="color" d="M 42.2,78.9 Q 50,50 53.88,64.48 L 57.7,80 Q 50,68 42,78.9Z" />
  </defs>
  `;

    allColorHexes.forEach((hex, i): void => {
      if (hex === pickedHex) {
        if (hex === '#FFFFFF') {
          svg += `  <circle cx="50%" cy="50%" r="8" fill="${hex}" stroke="black" stroke-width=".03" stroke-dasharray="2,2"/>`;
        } else {
          svg += `  <circle cx="50%" cy="50%" r="8" fill="${hex}"/>`;
        }
      } else {
        svg += `  <use xlink:href="#color" transform="rotate(${i * degrees},50,50)" fill="${hex}"/>`;
      }
    });

    svg += `</svg>`;

    return svg;
  };

  const createURL = (svg: string): string => {
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  };

  $: backgroundImage = createURL(createColorWheelSVG(pickedHex, allColorHexes));
</script>

<div class="colorWheel" style="background-image: {backgroundImage}">
  <slot />
</div>

<style>
  .colorWheel {
    height: 100%;
    width: 100%;
    background-size: 160% 160%;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
