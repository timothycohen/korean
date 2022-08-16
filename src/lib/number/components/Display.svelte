<script lang="ts">
  import { goal, direction, parsedInput, showGoalAnswer, showParsedInput } from '$number/stores';
</script>

<div class="detailsWrapper">
  {#if $direction === 'seeNumTypeKo'}
    <h1 class="goal en" lang="en" tabindex="0" aria-label="Goal {$goal.number}">{$goal.number}</h1>

    <h2 class="answer ko" lang="ko" tabindex={$showGoalAnswer ? 0 : -1} aria-label={`Answer ${$goal.hangul}`}>
      {$showGoalAnswer ? $goal.hangul : ' '}
    </h2>
  {:else}
    <h1 class="goal ko" lang="ko" tabindex="0" aria-label="Goal {$goal.hangul}">{$goal.hangul}</h1>

    <h2 class="answer en" lang="en" tabindex={$showGoalAnswer ? 0 : -1} aria-label={`Answer ${$goal.number}`}>
      {$showGoalAnswer ? $goal.number : ' '}
    </h2>

    <h2 class="parsedInput ko" lang="ko" aria-label="Your input {parsedInput}" tabindex={$showParsedInput ? 0 : -1}>
      {$showParsedInput ? $parsedInput : ' '}
    </h2>
  {/if}
</div>

<style>
  .detailsWrapper {
    height: 300px;
    display: grid;
    align-content: flex-end;
  }
  .ko {
    font-family: GowunDodum;
    font-weight: 400;
  }
  .en {
    font-family: BioRhyme;
    font-weight: 300;
  }
  .answer {
    color: var(--gray5);
    display: grid;
  }
  .answer.ko {
    font-size: 2rem;
    align-items: center;
    min-height: 150px;
  }
  .answer.en {
    font-size: clamp(1.5rem, 5vw, 2rem);
    align-items: flex-end;
    min-height: 50px;
  }
  .goal {
    width: 100%;
    color: var(--gray5);
    font-weight: 700;
  }
  .goal.ko {
    font-size: clamp(1.5rem, 1.25rem + 3.3333vw, 2.5rem);
    min-height: 170px;
    display: grid;
    align-items: flex-end;
  }
  .goal.en {
    font-size: clamp(1.5rem, 1.25rem + 3.3333vw, 2.5rem);
    min-height: 150px;
    display: grid;
    align-items: flex-end;
  }
  .parsedInput {
    width: 100%;
    color: var(--gray4);
  }
  .parsedInput.ko {
    font-size: clamp(1rem, 1.25rem + 3.3333vw, 1.5rem);
    min-height: 80px;
    display: grid;
    align-items: flex-end;
  }

  @media only screen and (min-width: 600px) {
    .detailsWrapper {
      height: 320px;
    }
  }
</style>
