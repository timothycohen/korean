<script lang="ts">
  // others
  // https://freesvg.org/vector-line-art-drawing-of-a-simple-shirt
  // https://freesvg.org/coloured-line-art-vector-image-of-trousers

  import Pullover from './Pullover.svelte';
  import Skirt from './Skirt.svelte';

  const colors = [0, 60, 120, 180, 240, 300];
</script>

{#each colors as c}
  <Skirt color={`hsl(${c}, 100%, 50%)`} />
  <Pullover color={`hsl(${c}, 100%, 50%)`} />
{/each}
