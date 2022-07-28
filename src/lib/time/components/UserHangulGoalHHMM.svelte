<script lang="ts">
  import { goal, parsedInput, showParsedInput, showGoalAnswer } from '$time/stores';
</script>

<div class="wrapper">
  <h1 class="goal">{$goal.hangul}</h1>
  <h2 class="answer">{$showGoalAnswer ? $goal.HHMM : ' '}</h2>
  <h2 class="parsedInput">{$showParsedInput ? $parsedInput : ' '}</h2>
</div>

<style>
  .wrapper {
    height: 100%;
    display: grid;
    align-content: center;
    gap: 1.5rem;
  }
  .goal {
    font-size: clamp(1.8rem, 1.25rem + 3.3333vw, 3rem);
    width: 100%;
    color: var(--gray5);
    font-family: GowunDodum;
    font-weight: 700;
  }
  .answer {
    font-size: clamp(1.5rem, 5vw, 3rem);
    color: var(--gray5);
    font-family: BioRhyme;
    font-weight: 300;
    min-height: 4.5rem;
  }
  .parsedInput {
    font-size: clamp(2rem, 1.25rem + 3.3333vw, 3rem);
    width: 100%;
    color: var(--gray4);
    font-family: GowunDodum;
    min-height: 4.5rem;
    font-weight: 400;
  }
</style>
