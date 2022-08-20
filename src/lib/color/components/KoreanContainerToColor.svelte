<script lang="ts">
  import { showAnswer, showKey, colors } from '$color/stores';
  import VisibilitySwitch from '$common/components/VisibilitySwitch.svelte';
  import KoreanContainer from '$common/components/KoreanContainer.svelte';

  $: color = $showAnswer ? $colors.color.hex : 'var(--primary2)';
  $: bg = $showAnswer
    ? $colors.color.korean === '까만색' || $colors.color.korean === '남색' || $colors.color.korean === '보라색'
      ? 'white'
      : 'black'
    : '#000000';
</script>

<KoreanContainer {color} {bg} text={$colors.color.korean}>
  <div class="container">
    <VisibilitySwitch bind:checked={$showKey} label="key" labelPosition="right" size="lg" />
    <VisibilitySwitch bind:checked={$showAnswer} label="answer" labelPosition="right" size="lg" />
  </div>
</KoreanContainer>

<style>
  .container {
    display: grid;
    height: 100%;
    grid-auto-flow: column;
  }

  @media only screen and (min-width: 600px) {
    .container {
      grid-auto-flow: row;
    }
  }
</style>
