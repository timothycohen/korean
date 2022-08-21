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
    class={`wave-page-input ${$direction === 'seeKoTypeHHMM' ? 'en' : 'ko'}`}
    style={$direction === 'seeKoTypeHHMM' ? '' : 'padding: 0 1rem;'}
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
