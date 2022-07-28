<script lang="ts">
  import RippleButton from '$common/components/unstyled/RippleButton.svelte';
  import { rippleStore } from '$common/stores';

  export let color = 'black',
    fontSize = '1rem',
    bgColor = 'var(--primary2)',
    bgHover = bgColor,
    bgActive = bgColor,
    round = '4px',
    height = '45',
    width = '150',
    shadow = '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    shadowHover = '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    shadowActive =
      '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    rippleOpacity = '.4',
    rippleFill = color,
    rippleFocus = color;

  // in case ripples are unwanted :(
  export let ripple = true;
  export let ripples = rippleStore();
</script>

<span
  style="--color: {color};
  --font-size: {fontSize};
  --bg-color: {bgColor};
  --bg-hover: {bgHover};
  --bg-active: {bgActive};
  --radius: {round};
  --height: {height}px;
  --width: {width}px;
  --shadow: {shadow};
  --shadow-h: {shadowHover};
  --shadow-a: {shadowActive};
  "
>
  <RippleButton {...$$restProps} on:click {rippleFill} {rippleOpacity} {rippleFocus} {ripple} {ripples}>
    <slot />
  </RippleButton>
</span>

<style>
  /* target extra css through button.btn-ripple; svg.ripples; circle.ripple; circle.show-on-focus */

  span :global(.btn-ripple) {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    font-weight: 500;
    color: var(--color);
    font-size: var(--font-size);
    height: var(--height);
    width: var(--width);
    max-width: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    border-radius: var(--radius);
    cursor: pointer;
    -webkit-transition: 200ms all ease-out;
    transition: 200ms all ease-out;
    background-color: var(--bg-color);
    overflow: hidden;
    font-family: Roboto, sans-serif;
    box-shadow: var(--shadow);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  span :global(.btn-ripple:hover) {
    outline: none;
    background-color: var(--bg-hover);
    filter: brightness(80%);
    box-shadow: var(--shadow-h);
  }
  span :global(.btn-ripple:focus) {
    outline: none;
    background-color: var(--bg-hover);
    filter: brightness(80%);
    box-shadow: var(--shadow-h);
  }
  span :global(.btn-ripple:active) {
    outline: none;
    background-color: (--bg-active);
    filter: brightness(70%);
    box-shadow: var(--shadow-a);
  }
</style>
