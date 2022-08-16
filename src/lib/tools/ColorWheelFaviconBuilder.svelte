<script lang="ts">
  import { Color } from '$backend/color';
  import ColorWheel from '$common/components/ColorWheel.svelte';
  import { onMount } from 'svelte';

  const allColorHexes = Color.all.map(c => c.hex);
  const picked = { hex: '#93CCDD', addToCenter: true, removeFromOuter: true, closeOuterGap: true };

  const colorPath = 'M 46,71 46.1,64.4 Q 43,59 43.78,65 L 57.7,78.9 Q 53,66 46.3,80Z';

  let wheel: HTMLElement;
  onMount(() => {
    console.log(wheel.firstChild?.firstChild);
  });
</script>

<div bind:this={wheel}>
  <ColorWheel {allColorHexes} {picked} {colorPath} />
</div>

<style>
  div {
    height: 500px;
    width: 500px;
  }
</style>
