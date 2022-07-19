<script lang="ts">
  import { showAnswer } from '$color/stores';
  import { colors } from '$color/stores';
  import KoreanContainerToColor from '$color/components/KoreanContainerToColor.svelte';
  import ColorSelection from './ColorSelection.svelte';
</script>

<div class="page" style="--bg: {$showAnswer ? $colors.color.hex : '#000000'};">
  <div class="koreanGridItem">
    <KoreanContainerToColor />
  </div>
  <div class="selectionGridItem">
    <ColorSelection />
  </div>
</div>

<style>
  .page {
    height: 100%;
    min-height: 100vh;
    background-color: var(--bg);
    display: grid;
    gap: 2rem;
    padding: 1rem 0;
    grid-template-rows: 35vh 1fr;
    grid-template-areas: 'korean' 'select';
    place-items: center;
  }

  .koreanGridItem {
    align-self: end;
    grid-area: korean;
  }

  .selectionGridItem {
    grid-area: select;
    width: 100%;
    align-self: start;
  }
</style>
