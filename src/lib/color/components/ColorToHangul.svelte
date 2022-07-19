<script lang="ts">
  import { colors } from '$color/stores';
  import ColorWheelAnimated from '$color/components/ColorWheelAnimated.svelte';
  import KoreanContainerToHangul from '$color/components/KoreanContainerToHangul.svelte';
  import Key from '$color/components/Key.svelte';
  import Input from '$color/components/Input.svelte';

  $: showWheel = true;
</script>

<div class="page" style="--bg: {$colors.color.hex};">
  <div class="colorWheelContainer" on:click={() => (showWheel = !showWheel)}>
    {#if showWheel}
      <ColorWheelAnimated />
    {/if}
  </div>

  <div class="wrapper">
    <KoreanContainerToHangul />
  </div>
  <Input />
  <Key />
</div>

<style>
  .page {
    height: 100%;
    min-height: 100vh;
    background-color: var(--bg);
    display: grid;
    padding: 1rem 0;
    place-items: center;
    grid-template-rows: 0.5fr 0.5fr 1fr;
  }
  .wrapper {
    align-self: flex-end;
  }
  .colorWheelContainer {
    position: absolute;
    height: 100px;
    width: 100px;
    right: 20px;
    top: 20px;
  }
  @media only screen and (min-width: 600px) {
    .page {
      grid-template-rows: 1fr 1fr 1fr;
    }
  }
</style>
