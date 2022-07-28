<script lang="ts">
  import { userInput, direction, showParsedInput, previousInput, hint, goal } from '$time/stores';
  import VisibilityIcon from '$common/components/VisibilityIcon.svelte';
  import { HangulTime } from '../logic';

  type E = Event & {
    currentTarget: EventTarget & HTMLInputElement;
  };

  const handleWin = () => {
    $userInput = '';
    $previousInput = '';
    goal.next();
  };

  const formatHHMM = (e: E) => {
    const val = e.currentTarget.value;
    if (HangulTime.isValidHHMM(val)) {
      $previousInput = $userInput;
      $userInput = val;
    } else {
      hint.trigger('Try HH:MM');
      $userInput = $previousInput;
    }
    if ($goal.isMatch(val)) handleWin();
  };

  const formatHangul = (e: E) => {
    const val = e.currentTarget.value;
    if (HangulTime.isValidHangul(val)) {
      $previousInput = $userInput;
      $userInput = val;
    } else {
      hint.trigger('The answer is in 한글!');
      $userInput = $previousInput;
    }
    if ($userInput === $goal.hangul) handleWin();
  };
</script>

{#key $goal.HHMM}
  {#if $direction === 'userHHMMGoalHangul'}
    <!-- required because key is needed to clear the hangul input cache to prevent autocomplete -->
    <!-- svelte-ignore a11y-autofocus -->
    <input
      class={$direction}
      type="text"
      lang="en"
      aria-label={`Enter hangul. Goal ${$goal.HHMM}`}
      bind:value={$userInput}
      on:input={formatHangul}
      autocomplete="off"
      autofocus={true}
      id="focus-trap-close"
    />
    <div class="visibility-icon-wrapper" />
  {:else}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      class={$direction}
      type="text"
      lang="ko"
      aria-label="Enter number. Goal {$goal.hangul}"
      bind:value={$userInput}
      on:input={formatHHMM}
      autocomplete="off"
      autofocus={true}
      id="focus-trap-close"
    />
    <div class="visibility-icon-wrapper">
      <VisibilityIcon visible={$showParsedInput} on:click={showParsedInput.toggle} />
    </div>
  {/if}
{/key}

<style>
  input {
    width: 100%;
    height: 3rem;
    font-size: clamp(1rem, 5.25vw, 2.5rem);
    padding: 0 3rem;
    text-align: center;
    border: 2px solid var(--primary2);
    border-radius: 4px;
    color: black;
  }
  input:focus-visible {
    border: 2px solid transparent;
    outline: 2px solid var(--primary4);
  }
  input::-webkit-clear-button,
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    display: none;
  }
  .userHHMMGoalHangul {
    font-family: 'GowunDodum';
  }
  .userHanGoalHHMM {
    font-family: 'BioRhyme';
  }
  .visibility-icon-wrapper {
    position: relative;
    justify-self: right;
    top: -2.4rem;
    right: 0.5rem;
    height: 2rem;
    width: 2rem;
  }
</style>
