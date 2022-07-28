<script lang="ts">
  import { goal, direction, parsedInput, showGoalAnswer, showParsedInput } from '$number/stores';
  import Goal from '$lib/number/components/Goal.svelte';
  import GoalAnswer from '$lib/number/components/GoalAnswer.svelte';
  import ParsedUserInput from '$common/components/ParsedUserInput.svelte';
</script>

<Goal
  numOrHan={$direction === 'userNumGoalHan' ? 'han' : 'num'}
  koreanAriaLabel={`Goal ${$goal.hangul}`}
  englishAriaLabel={`Goal ${$goal.number}`}
>
  {$direction === 'userNumGoalHan' ? $goal.hangul : $goal.formattedNumber}
</Goal>
<GoalAnswer
  numOrHan={$direction === 'userNumGoalHan' ? 'num' : 'han'}
  koreanAriaLabel={`Answer ${$goal.hangul}`}
  englishAriaLabel={`Answer ${$goal.number}`}
  tabindex={showGoalAnswer ? 0 : -1}
>
  {$showGoalAnswer ? ($direction === 'userNumGoalHan' ? $goal.formattedNumber : $goal.hangul) : ' '}
</GoalAnswer>
<ParsedUserInput
  tabindex={showParsedInput && $direction === 'userNumGoalHan' ? 0 : -1}
  ariaLabel={`Your input ${parsedInput}`}
  show={$showParsedInput}
>
  {$parsedInput}
</ParsedUserInput>
