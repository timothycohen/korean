<script lang="ts">
  import Clock from '$time/components/Clock.svelte';
  import { goal, showGoalAnswer } from '$time/stores';
</script>

<div class="wrapper">
  <div class="clockWrapper">
    <Clock size={250} hour={$goal.hour} minute={$goal.minute} />
  </div>
  <h1>{$showGoalAnswer ? $goal.hangul : ''}</h1>
</div>

<style>
  .wrapper {
    height: 100%;
    display: grid;
    align-content: center;
  }
  h1 {
    font-size: clamp(1.8rem, 1.25rem + 3.3333vw, 3rem);
    color: var(--gray5);
    font-family: GowunDodum;
    font-weight: 700;
    min-height: 70px;
  }
  .clockWrapper {
    height: 250px;
  }
</style>
