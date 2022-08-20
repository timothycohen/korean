<script lang="ts">
  import RippleButton from '$common/components/unstyled/RippleButton.svelte';
  import { rippleStore } from '$common/stores';

  export let rippleFill = 'currentColor',
    rippleOpacity = 0.1,
    rippleFillFocus = 'currentColor',
    rippleOpacityFocus = 0.2;

  // in case ripples are unwanted :(
  export let ripple = true;
  export let ripples = rippleStore();
</script>

<span>
  <RippleButton
    {...$$restProps}
    on:click
    {rippleFill}
    {rippleOpacity}
    {rippleFillFocus}
    {rippleOpacityFocus}
    {ripple}
    {ripples}
  >
    <slot />
  </RippleButton>
</span>

<style>
  /* target extra css through button.btn-ripple; svg.ripples; circle.ripple; circle.show-on-focus */
  span :global(.btn-ripple) {
    appearance: none;
    border: var(--border, none);
    font-weight: var(--font-weight, 500);
    color: var(--color, black);
    font-size: var(--font-size, 1.5rem);
    height: var(--height);
    min-height: var(--min-height);
    width: var(--width);
    min-width: var(--min-width);
    margin: var(--margin, 0);
    padding: var(--padding, 0.5rem 1rem);
    position: var(--position, relative);
    border-radius: var(--border-radius, 4px);
    cursor: var(--cursor, pointer);
    transition: var(--transition, 200ms all ease-out);
    background-color: var(--background-color, var(--primary2));
    overflow: var(--overflow, hidden);
    font-family: var(--font-family, var(--font-en, sans-serif));
    user-select: var(--user-select, none);
    box-shadow: var(
      --box-shadow,
      0 2px 4px -1px rgb(0 0 0 / 20%),
      0 4px 5px 0 rgb(0 0 0 / 14%),
      0 1px 10px 0 rgb(0 0 0 / 12%)
    );
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }
  span :global(.btn-ripple:hover) {
    outline: var(--outline-h, none);
    background-color: var(--background-color-h, var(--background-color, var(--primary2)));
    filter: var(--filter-h, brightness(80%));
    box-shadow: var(--box-shadow-h), 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
      0 1px 10px 0 rgb(0 0 0 / 12%);
  }
  span :global(.btn-ripple:focus) {
    outline: var(--outline-f, none);
    background-color: var(--background-color-f, var(--background-color-h, var(--background-color, var(--primary2))));
    filter: brightness(80%);
    box-shadow: var(--box-shadow-h), 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
      0 1px 10px 0 rgb(0 0 0 / 12%);
  }
  span :global(.btn-ripple:active) {
    outline: var(--outline-a, none);
    background-color: var(--background-color-a, var(--background-color-h, var(--background-color, var(--primary2))));
    filter: var(--filter-a, brightness(70%));
    box-shadow: var(
      --box-shadow-a,
      0 5px 5px -3px rgb(0 0 0 / 20%),
      0 8px 10px 1px rgb(0 0 0 / 14%),
      0 3px 14px 2px rgb(0 0 0 / 12%)
    );
  }
</style>
