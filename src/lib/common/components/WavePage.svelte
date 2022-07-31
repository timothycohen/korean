<script lang="ts">
  export let shimmer = false;

  // use WavePageBuilder to create a suitable wave
  export let dSmall =
    'M 0,350 C 245,500 800,330 1080,275 C 1250,228 1340,250 1440,280 C 1440,0 1440,0 1440,0 C 0,0 1440,0 0,0';

  export let dBig =
    'M 0,200 C 245,300 500,260 900,210 C 1150,175 1340,175 1440,225 C 1440,0 1440,0 1440,0 C 0,0 1440,0 0,0';

  const createWaveSVG = (d: string, color: string): string => {
    return `<svg alt="" width="100%" height="100%" viewBox="0 0 1440 1440" xmlns="http://www.w3.org/2000/svg">
  <path
    d="${d}"
    stroke="none"
    strokeWidth="0"
    fill='${color}'
  />
  </svg>`;
  };

  const createURL = (d: string, color: string): string => {
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(createWaveSVG(d, color))}")`;
  };
</script>

<div
  class="wavePage"
  style="
  --bg-image-small: {createURL(dSmall, '#353c6d')};
  --bg-image-big: {createURL(dBig, '#353c6d')};
  --filter: {shimmer ? 'var(--shimmer)' : ''};"
>
  <slot />
</div>

<style>
  .wavePage {
    min-height: 100%;
    width: 100%;
    padding: 1rem;
    border: 0.5rem solid var(--primary2);
    position: relative;
  }

  .wavePage::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: var(--bg-image-small);
    background-color: var(--complement2);
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: -1;
    transition: 300ms;
    filter: var(--filter);
  }

  @media only screen and (min-width: 600px) {
    .wavePage::before {
      background-image: var(--bg-image-big);
    }
  }
</style>
