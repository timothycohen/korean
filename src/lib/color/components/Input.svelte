<script lang="ts">
  import VisibilitySwitch from '$common/components/VisibilitySwitch.svelte';
  import { colors, streakCounter, showKey, showAnswer, showAnimations } from '$color/stores';
  import { debounceStore } from '$common/stores';

  let userInput = '';
  let inputEl: HTMLInputElement;

  let justWon = debounceStore(200, () => {
    setTimeout(() => {
      // explicitly #key the input and call .focus()
      // otherwise userInput = '' doesn't clear the cache and 색 autocompletes on first keydown
      userInput = '';
      inputEl.focus();
    }, 0);
  });

  $: if (userInput === $colors.color.Korean) {
    if ($showAnimations) justWon.trigger('shrinkFont');
    else userInput = '';

    colors.next();
    streakCounter.increment();
  }
</script>

<div class="blackContainer inputContainer">
  <VisibilitySwitch bind:checked={$showKey} label="key" labelPosition="left" />
  {#key $justWon}
    <input
      type="text"
      class="{$justWon} styledInput"
      id="koreanColor"
      lang="ko"
      autoComplete="off"
      bind:value={userInput}
      bind:this={inputEl}
    />
  {/key}
  <VisibilitySwitch bind:checked={$showAnswer} label="answer" labelPosition="left" />
</div>

<style>
  .inputContainer {
    width: 90%;
    padding: 1rem;
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    margin: 0;
    grid-template-areas: 'textInput textInput' 'keySwitch answerSwitch';
  }
  .styledInput {
    font-family: GowunDodum;
    grid-area: textInput;
    text-align: center;
    border: 1px solid var(--gray5);
    border-radius: 4px;
    font-size: 3rem;
    padding: 2rem;
    background-color: black;
    color: var(--primary2);
    width: 100%;
    height: 3rem;
  }
  .styledInput:focus-visible {
    border: 1px solid transparent;
    outline: 2px solid var(--gray4);
  }
  .styledInput::-webkit-clear-button,
  .styledInput::-webkit-outer-spin-button,
  .styledInput::-webkit-inner-spin-button {
    display: none;
  }
  @media only screen and (min-width: 600px) {
    .inputContainer {
      grid-template-columns: auto 1fr auto;
      grid-template-rows: 1fr;
      grid-template-areas: 'keySwitch textInput answerSwitch';
    }
  }

  @keyframes shrinkFont {
    0% {
    }
    100% {
      font-size: 1rem;
    }
  }

  .shrinkFont {
    animation-duration: 200ms;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
    transform-origin: center center;
    animation-fill-mode: forwards;
    animation-name: shrinkFont;
  }
</style>
