<script lang="ts">
  const createWaveSVG = (color: string): string => {
    return `<svg alt="" width="100%" height="100%" viewBox="0 0 1440 400" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M 0,400 C 0,400 0,200 0,200 C 88.75,226.39285714285714 177.5,252.78571428571428 293,253 C 408.5,253.21428571428572 550.7499999999999,227.25000000000003 702,207 C 853.2500000000001,186.74999999999997 1013.5,172.21428571428572 1138,172 C 1262.5,171.78571428571428 1351.25,185.89285714285714 1440,200 C 1440,200 1440,400 1440,400 Z"
    stroke="none"
    strokeWidth="0"
    fill='${color}'
    transform="rotate(-180 720 200)"
  ></path>
</svg>`;
  };

  const createURL = (color: string): string => {
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(createWaveSVG(color))}")`;
  };

  export let shimmer = false;
</script>

<div class="wavePage" style="--bg-image: {createURL('#353c6d')}; --filter: {shimmer ? 'var(--shimmer)' : ''};">
  <slot />
</div>

<style>
  .wavePage {
    min-height: 100vh;
    padding: 1rem;
    border: 0.5rem solid var(--primary2);
  }
  .wavePage::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: var(--bg-image);
    background-color: var(--complement2);
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: -1;
    transition: 300ms;
    filter: var(--filter);
  }
</style>
