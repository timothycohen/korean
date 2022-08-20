<script lang="ts">
  import { showAnswer, colors } from '$color/stores';
  import KoreanContainer from '$common/components/KoreanContainer.svelte';

  $: color = $showAnswer ? $colors.color.hex : 'var(--primary2)';
  $: bg =
    $colors.color.korean === '까만색' || $colors.color.korean === '남색' || $colors.color.korean === '보라색'
      ? 'white'
      : 'black';
</script>

{#if $showAnswer}
  <KoreanContainer {color} {bg} text={$colors.color.korean}>
    <slot />
  </KoreanContainer>
{/if}
