<script lang="ts">
  import { direction, goal, parsedInput, showParsedInput, showGoalAnswer } from '$time/stores';
  import Clock from '$time/components/Clock.svelte';
</script>

<div class="detailsWrapper">
  {#if $direction === 'seeHHMMTypeKo'}
    <span class="clockWrapper"><Clock size={180} hour={$goal.hour} minute={$goal.minute} /></span>
    <h1 class="answer-hangul">{$showGoalAnswer ? $goal.hangul : ''}</h1>
  {:else}
    <h1 class="goal">{$goal.hangul}</h1>
    <h2 class="answer-hhmm">{$showGoalAnswer ? $goal.HHMM : ' '}</h2>
    <h2 class="parsedInput ko">{$showParsedInput ? $parsedInput : ' '}</h2>
  {/if}
</div>

<style>
  .detailsWrapper {
    height: 250px;
    display: grid;
    align-content: flex-end;
  }
  .goal {
    font-size: clamp(1.8rem, 1.25rem + 3.3333vw, 3rem);
    width: 100%;
    color: var(--gray5);
    font-family: GowunDodum;
    font-weight: 700;
  }
  .answer-hhmm {
    font-size: clamp(2rem, 5vw, 3rem);
    color: var(--gray5);
    font-family: BioRhyme;
    font-weight: 300;
    min-height: 4.5rem;
  }
  .parsedInput {
    font-size: clamp(2rem, 1.25rem + 3.3333vw, 3rem);
    width: 100%;
    color: var(--gray4);
    min-height: 4.5rem;
  }
  .ko {
    font-family: GowunDodum;
    font-weight: 400;
  }
  .clockWrapper {
    height: 180px;
  }
  .answer-hangul {
    font-size: clamp(1.8rem, 1.25rem + 3.3333vw, 2.75rem);
    color: var(--gray5);
    font-family: GowunDodum;
    font-weight: 700;
    min-height: 70px;
  }
  @media only screen and (min-width: 600px) {
    .clockWrapper :global(button) {
      transform: scale(1.39); /* (320 - 70) / (250 - 70) */
      transform-origin: bottom;
    }
    .detailsWrapper {
      height: 320px;
    }
  }
</style>
