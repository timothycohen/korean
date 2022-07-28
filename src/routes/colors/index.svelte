<script lang="ts">
  import DirectionBtn from '$common/components/ButtonLanguageDirection.svelte';
  import ColorToHangul from '$color/components/ColorToHangul.svelte';
  import HangulToColor from '$color/components/HangulToColor.svelte';
  import { direction } from '$color/stores';
  import { colors as colorsStore, allColors as allColorsStore } from '$color/stores';

  // automagically fetched from page endpoint. Hot potato data into stores instead of prop drilling
  export let colors, allColors;
  colorsStore.init(colors);
  allColorsStore.set(allColors);
</script>

<svelte:head>
  <title>Colors</title>
  <link rel="icon" href="/favicon.svg" />
</svelte:head>

<div class="directionBtnContainer">
  <DirectionBtn
    on:click={direction.toggle}
    direction={$direction === 'colorToHangul' ? 'left' : 'right'}
    labelLeft="한글"
    labelRight="Color"
  />
</div>

{#if $direction === 'colorToHangul'}
  <ColorToHangul />
{:else}
  <HangulToColor />
{/if}

<style>
  .directionBtnContainer {
    position: absolute;
    left: 1.5rem;
    top: calc(1rem + 25px);
  }
</style>
