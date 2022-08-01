<script lang="ts">
  import DirectionBtn from '$common/components/ButtonLanguageDirection.svelte';
  import { direction, showAnswer } from '$color/stores';
  import { colors as colorsStore, allColors as allColorsStore } from '$color/stores';
  import ColorWheelAnimated from '$color/components/ColorWheelAnimated.svelte';
  import KoreanContainerToColor from '$color/components/KoreanContainerToColor.svelte';
  import ColorSelection from '$color/components/ColorSelection.svelte';
  import KoreanContainerToHangul from '$color/components/KoreanContainerToHangul.svelte';
  import Key from '$color/components/Key.svelte';
  import Input from '$color/components/Input.svelte';

  // automagically fetched from page endpoint. Hot potato data into stores instead of prop drilling
  export let colors, allColors;
  colorsStore.init(colors);
  allColorsStore.set(allColors);

  $: showWheel = true;
</script>

<svelte:head>
  <title>Colors</title>
  <link rel="icon" href="/favicon-colors.svg" />
</svelte:head>

<div class="page" style="--bg: {$showAnswer || $direction === 'colorToHangul' ? $colorsStore.color.hex : '#000000'};">
  <div class="topBar">
    <DirectionBtn
      on:click={direction.toggle}
      direction={$direction === 'colorToHangul' ? 'left' : 'right'}
      labelLeft="한글"
      labelRight="Color"
    />
    <div class="colorWheelContainer" on:click={() => (showWheel = !showWheel)}>
      {#if showWheel}
        <ColorWheelAnimated />
      {/if}
    </div>
  </div>

  <div class="view {$direction}">
    {#if $direction === 'colorToHangul'}
      <span><KoreanContainerToHangul /></span>
      <span><Input /></span>
      <span><Key /></span>
    {:else}
      <KoreanContainerToColor />
      <ColorSelection />
    {/if}
  </div>
</div>

<style>
  .page {
    background-color: var(--bg);
    min-height: 100vh;
  }

  .topBar {
    padding: 0.5rem 1.25rem 0 1.5rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: column;
    align-items: center;
  }
  .topBar .colorWheelContainer {
    height: 100px;
    width: 100px;
  }

  .view {
    display: grid;
    padding: 1rem;
    gap: 2rem;
  }

  .view.colorToHangul {
    justify-items: center;
    display: grid;
    grid-template-rows: 96px 164px auto;
  }

  @media only screen and (min-width: 600px) {
    .view.colorToHangul {
      grid-template-rows: 112px 98px auto;
    }
  }
</style>
