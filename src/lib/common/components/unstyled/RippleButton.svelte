<script lang="ts">
  // target extra css through button.btn-ripple; svg.ripples; circle.ripple; circle.show-on-focus
  import { onMount } from 'svelte';
  import Ripple from '$common/components/unstyled/Ripple.svelte';
  import { rippleStore } from '$common/stores';
  import '$animations/breathe.css';

  // hot potato to ripple components
  export let ripple = true;
  export let rippleBlur = 2,
    speed = 500,
    sizeIn = 20,
    opacityIn = 0.2;

  // important ripple styles that I want to show on intellisense
  export let rippleFill: string;
  export let rippleOpacity: string;
  export let rippleFocus: string;

  // pull the size info from the container
  let rippleBtn: HTMLButtonElement;
  const c = {
    containerW: 0,
    containerH: 0,
    containerX: 0,
    containerY: 0,
  };

  onMount(() => {
    c.containerW = rippleBtn.offsetWidth;
    c.containerH = rippleBtn.offsetHeight;
    const { x, y } = rippleBtn.getBoundingClientRect();
    c.containerX = x;
    c.containerY = y;
  });

  // turn interactions into ripples and pop them into a ripple store. Export this in case the parent wants to control invalidation or synchrony
  export let ripples = rippleStore();

  let touch: boolean;
  function handleInteraction(e: MouseEvent | Touch, type: 'touch' | 'click') {
    let absoluteX = type === 'touch' ? e?.pageX : e?.clientX;
    let absoluteY = type === 'touch' ? e?.pageY : e?.clientY;
    const addRipple = () => ripples.add({ absoluteX, absoluteY, ...c });

    if (type === 'touch') {
      addRipple();
      touch = true;
    }
    if (type === 'click') {
      if (!touch) addRipple();
      touch = false;
    }
    ripples.debounce(speed + speed * 2);
  }
</script>

<button
  {...$$restProps}
  class="btn-ripple"
  style="--rippleFill: {rippleFill}; --rippleOpacity: {rippleOpacity}; --rippleFocus: {rippleFocus};"
  on:click
  bind:this={rippleBtn}
  on:touchstart={e => handleInteraction(e.touches[0], 'touch')}
  on:mousedown={e => handleInteraction(e, 'click')}
>
  <svg class="ripples">
    {#if ripple}
      {#each $ripples as ripple}
        <Ripple
          {rippleFill}
          x={ripple.relativeX}
          y={ripple.relativeY}
          size={ripple.size}
          {speed}
          {sizeIn}
          {opacityIn}
          {rippleBlur}
        />
      {/each}
    {/if}
    <circle class="show-on-focus breathe" cx={c.containerW / 2} cy={c.containerH / 2} r={c.containerW / 2.4} />
  </svg>
  <slot />
</button>

<style>
  svg {
    height: 100%;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
  }
  .show-on-focus {
    fill: var(--rippleFocus);
    display: none;
    opacity: var(--rippleOpacity);
  }
  .btn-ripple:focus {
    outline: none;
  }
  .btn-ripple:focus-visible circle.show-on-focus {
    display: block;
  }
</style>
