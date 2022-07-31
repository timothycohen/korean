<script lang="ts">
  import { userInput, direction, showParsedInput, previousInput, hint, goal } from '$time/stores';
  import VisibilityIcon from '$common/components/VisibilityIcon.svelte';
  import { HangulTime } from '$time/logic';

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
  <!-- autofocus required because key is needed to clear the hangul input cache -->
  <!-- svelte-ignore a11y-autofocus -->
  <!-- lang is backwards so that the aria-label reads the goal properly -->
  <input
    class={$direction === 'seeKoTypeHHMM' ? 'en' : 'ko'}
    type="text"
    lang={$direction === 'seeKoTypeHHMM' ? 'ko' : 'en'}
    aria-label={$direction === 'seeKoTypeHHMM'
      ? `Enter number. Goal ${$goal.hangul}`
      : `Enter hangul. Goal ${$goal.HHMM}`}
    bind:value={$userInput}
    on:input={e => ($direction === 'seeKoTypeHHMM' ? formatHHMM(e) : formatHangul(e))}
    autocomplete="off"
    autofocus={true}
    id="focus-trap-close"
  />
  <div class="visibility-icon-wrapper">
    {#if $direction === 'seeKoTypeHHMM'}
      <VisibilityIcon visible={$showParsedInput} on:click={showParsedInput.toggle} />
    {/if}
  </div>
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
  .ko {
    font-family: 'GowunDodum';
  }
  .en {
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
