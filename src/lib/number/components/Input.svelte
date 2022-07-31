<script lang="ts">
  import { direction, drawer, goal, hint, previousInput, showParsedInput, userInput } from '$number/stores';
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
  <!-- autofocus required because key is needed to clear the hangul input cache -->
  <!-- svelte-ignore a11y-autofocus -->
  <!-- lang is backwards so that the aria-label reads the goal properly -->
  <input
    class={`wave-page-input ${$direction === 'seeKoTypeNum' ? 'en' : 'ko'}`}
    type="text"
    lang={$direction === 'seeKoTypeNum' ? 'ko' : 'en'}
    aria-label={$direction === 'seeKoTypeNum'
      ? `Enter number. Goal ${$goal.hangul}`
      : `Enter hangul. Goal ${$goal.number}`}
    bind:value={$userInput}
    on:input={e => ($direction === 'seeKoTypeNum' ? formatNumber(e) : formatHangul(e))}
    autocomplete="off"
    autofocus={!$drawer}
    id="focus-trap-close"
  />
  <div class="visibility-icon-wrapper">
    {#if $direction === 'seeKoTypeNum'}
      <VisibilityIcon visible={$showParsedInput} on:click={showParsedInput.toggle} />
    {/if}
  </div>
{/key}
