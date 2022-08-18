<script lang="ts">
  import DirectionBtn from '$common/components/ButtonLanguageDirection.svelte';
  import { direction, showAnswer, showAnimations, allColors } from '$color/stores';
  import { colors as colorsStore, allColors as allColorsStore } from '$color/stores';
  import ColorWheelAnimated from '$color/components/ColorWheelAnimated.svelte';
  import KoreanContainerToColor from '$color/components/KoreanContainerToColor.svelte';
  import ColorSelection from '$color/components/ColorSelection.svelte';
  import KoreanContainerToHangul from '$color/components/KoreanContainerToHangul.svelte';
  import Key from '$color/components/Key.svelte';
  import Input from '$color/components/Input.svelte';
  import type { PageData } from './$types';
  import ColorWheel from '$common/components/ColorWheel.svelte';

  // automagically fetched from page endpoint. Hot potato data into stores instead of prop drilling
  export let data: PageData;
  colorsStore.init(data.colors);
  allColorsStore.set(data.allColors);
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
    <div class="colorWheelContainer" on:click={showAnimations.toggle} title="toggle animations">
      {#if $showAnimations}
        <ColorWheelAnimated />
      {:else}
        <ColorWheel allColorHexes={$allColors.map(c => c.hex)} --opacity="50%" --transform="scale(75%)" />
      {/if}
    </div>
  </div>

  <div class="view {$direction}">
    {#if $direction === 'colorToHangul'}
      <span><KoreanContainerToHangul /></span>
      <Input />
      <Key />
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
    overflow: hidden;
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
    grid-template-rows: 96px 164px auto;
  }

  .view.colorToHangul span:nth-child(1) {
    display: grid;
    justify-items: center;
  }

  @media only screen and (min-width: 600px) {
    .view.colorToHangul {
      grid-template-rows: 112px 98px auto;
    }
  }
</style>
