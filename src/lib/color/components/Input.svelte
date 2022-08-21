<script lang="ts">
  import VisibilitySwitch from '$common/components/VisibilitySwitch.svelte';
  import { colors, streakCounter, showKey, showAnswer, showAnimations } from '$color/stores';
  import { tempStore } from '$common/stores';

  let userInput = '';
  let inputEl: HTMLInputElement;

  let justWon = tempStore(200, () => {
    setTimeout(() => {
      // explicitly #key the input and call .focus()
      // otherwise userInput = '' doesn't clear the cache and 색 autocompletes on first keydown
      userInput = '';
      inputEl.focus();
    }, 0);
  });

  $: if (userInput === $colors.color.korean) {
    if ($showAnimations) justWon.trigger('shrink-font');
    else userInput = '';

    colors.next();
    streakCounter.increment();
  }
</script>

<div class="black-container input-container">
  <VisibilitySwitch bind:checked={$showKey} label="key" labelPosition="left" />
  {#key $justWon}
    <input
      type="text"
      class="{$justWon} styled-input"
      id="korean-color"
      lang="ko"
      autoComplete="off"
      bind:value={userInput}
      bind:this={inputEl}
    />
  {/key}
  <VisibilitySwitch bind:checked={$showAnswer} label="answer" labelPosition="left" />
</div>

<style>
  .input-container {
    width: 90%;
    padding: 1rem;
    display: grid;
    place-items: center;
    grid-template: 'text-input text-input' 'key-switch answer-switch';
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    margin: 0;
  }
  .styled-input {
    font-family: var(--font-ko);
    grid-area: text-input;
    text-align: center;
    border: 1px solid var(--gray5);
    border-radius: 4px;
    background-color: black;
    color: var(--primary2);
    width: 100%;
    height: 4rem;
    font-size: 2.75rem;
    line-height: normal;
    padding: 0 2rem;
  }
  .styled-input:focus-visible {
    border: 1px solid transparent;
    outline: 2px solid var(--gray4);
  }
  .styled-input::-webkit-clear-button,
  .styled-input::-webkit-outer-spin-button,
  .styled-input::-webkit-inner-spin-button {
    display: none;
  }
  @media only screen and (min-width: 600px) {
    .input-container {
      grid-template: 'key-switch text-input answer-switch';
      grid-template-columns: auto 1fr auto;
      grid-template-rows: 1fr;
    }
  }

  @keyframes shrink-font {
    100% {
      font-size: 1rem;
    }
  }
  .shrink-font {
    animation-duration: 200ms;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
    transform-origin: center center;
    animation-fill-mode: forwards;
    animation-name: shrink-font;
  }
</style>
