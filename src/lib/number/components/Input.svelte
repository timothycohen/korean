<script lang="ts">
  import { goal, userInput, direction, showParsedInput, drawer, previousInput, hint } from '$number/stores';
  import VisibilityIcon from '$common/components/VisibilityIcon.svelte';

  type E = Event & {
    currentTarget: EventTarget & HTMLInputElement;
  };

  const handleWin = () => {
    $userInput = '';
    $previousInput = '';
    $goal = $goal.setRandom();
  };

  const formatNumber = (e: E) => {
    let userVal = e.currentTarget.value;
    // disallow everything but numbers, periods, and commas
    if (/[^0-9.,]+/.test(userVal) || /^00/.test(userVal)) {
      $userInput = $previousInput;
      hint.trigger('The answer is a number!');
    } else {
      // trim leading zeros
      if (userVal.length > 1 && userVal[0] === '0') {
        userVal = userVal.slice(1, userVal.length);
      }
      $previousInput = $userInput;
      $userInput = userVal;
    }

    let cleanedInput = $userInput.replaceAll('.', '').replaceAll(',', '');
    if ($goal.number === parseInt(cleanedInput, 10)) handleWin();
  };

  const formatHangul = (e: E) => {
    const userVal = e.currentTarget.value;
    // disallow any English letters, numbers, periods, or commas
    if (/[A-Za-z0-9.,]/.test(userVal)) {
      $userInput = $previousInput;
      hint.trigger('The answer is in 한글!');
    } else {
      $previousInput = $userInput;
      $userInput = userVal;
    }

    if ($userInput === $goal.hangul) handleWin();
  };
</script>

{#key $goal.number}
  {#if $direction === 'userHanGoalNum'}
    <!-- required because key is needed to clear the hangul input cache to prevent autocomplete -->
    <!-- svelte-ignore a11y-autofocus -->
    <input
      class={$direction}
      type="text"
      lang="en"
      aria-label={`Enter hangul. Goal ${$goal.number}`}
      bind:value={$userInput}
      on:input={formatHangul}
      autocomplete="off"
      autofocus={!$drawer}
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
      on:input={formatNumber}
      autocomplete="off"
      autofocus={!$drawer}
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
  .userNumGoalHan {
    font-family: 'BioRhyme';
  }
  .userHanGoalNum {
    font-family: 'GowunDodum';
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
