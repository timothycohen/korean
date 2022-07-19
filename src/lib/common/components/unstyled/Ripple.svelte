<script lang="ts">
  // target extra css through :global(circle.ripple) {}
  // inspiration from https://svelte.dev/repl/dbf681d6ba014f1d9cfc919f1bc59481?version=3.19.2
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { backOut } from 'svelte/easing';

  export let x: number;
  export let y: number;
  export let sizeIn: number;
  export let size: number;
  export let speed: number;
  export let rippleBlur: number;
  export let opacityIn: number;
  export let rippleFill: string;

  const rippleSize = tweened(sizeIn, { duration: speed });
  const rippleOpacity = tweened(opacityIn, { duration: speed + speed * 2.5, easing: backOut });

  onMount(() => {
    rippleOpacity.set(0);
    rippleSize.set(size);
  });
</script>

<defs>
  <filter id="f1" x="0" y="0">
    <feGaussianBlur in="SourceGraphic" stdDeviation={rippleBlur} />
  </filter>
</defs>

<circle
  class="ripple"
  style="fill: {rippleFill};"
  cx={x}
  cy={y}
  r={$rippleSize}
  opacity={$rippleOpacity}
  filter="url(#f1)"
/>
