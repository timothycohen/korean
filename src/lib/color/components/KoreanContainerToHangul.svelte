<script lang="ts">
  import { showAnswer, colors } from '$color/stores';
  import KoreanContainer from '$common/components/KoreanContainer.svelte';

  $: color = $showAnswer ? $colors.color.hex : 'var(--primary2)';
  $: bg =
    $colors.color.Korean === '까만색' || $colors.color.Korean === '남색' || $colors.color.Korean === '보라색'
      ? 'white'
      : 'black';
</script>

{#if $showAnswer}
  <KoreanContainer {color} {bg} text={$colors.color.Korean}>
    <slot />
  </KoreanContainer>
{/if}
