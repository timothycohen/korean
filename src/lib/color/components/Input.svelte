<script lang="ts">
  import VisibilitySwitch from '$common/components/VisibilitySwitch.svelte';
  import { colors, direction, streakCounter, showKey, showAnswer } from '$color/stores';

  let userInput = '';
  $: if (userInput === $colors.color.Korean) {
    colors.next();
    streakCounter.increment();
    userInput = '';
  }
</script>

<div class="blackContainer inputContainer">
  <VisibilitySwitch bind:checked={$showKey} label="key" labelPosition="left" />
  <input
    type="text"
    class="input styledInput {$direction === 'colorToHangul' ? 'hangulInput' : ''}"
    id="koreanColor"
    lang="ko"
    autoComplete="off"
    bind:value={userInput}
  />
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
    grid-template-areas: 'textInput textInput' 'keySwitch answerSwitch';
  }
  .input {
    width: 100%;
    height: 3rem;
    font-size: clamp(1rem, 5.25vw, 2.5rem);
    padding: 0 1.25rem;
    text-align: center;
    border: 2px solid var(--primary2);

    border-radius: 4px;
    font-family: BioRhyme;
  }
  .input:focus-visible {
    border: 2px solid transparent;
    outline: 2px solid var(--primary4);
  }
  .input::-webkit-clear-button,
  .input::-webkit-outer-spin-button,
  .input::-webkit-inner-spin-button {
    display: none;
  }
  .hangulInput {
    font-family: GowunDodum;
  }
  .styledInput {
    grid-area: textInput;
    border: 1px solid var(--gray5);
    font-size: 3rem;
    padding: 2rem;
    background-color: black;
    color: var(--primary2);
  }
  .styledInput:focus-visible {
    border: 1px solid transparent;
    outline: 2px solid var(--gray4);
  }
  @media only screen and (min-width: 600px) {
    .inputContainer {
      grid-template-columns: auto 1fr auto;
      grid-template-rows: 1fr;
      grid-template-areas: 'keySwitch textInput answerSwitch';
    }
  }
</style>
