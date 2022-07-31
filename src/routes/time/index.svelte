<script lang="ts">
  import WavePage from '$common/components/WavePage.svelte';
  import VisibilitySwitch from '$common/components/VisibilitySwitch.svelte';
  import { showGoalAnswer, hint } from '$time/stores';
  import Display from '$time/components/Display.svelte';
  import DirectionBtn from '$time/components/DirectionBtn.svelte';
  import Input from '$time/components/Input.svelte';
</script>

<svelte:head>
  <title>Time</title>
  <link rel="icon" href="/favicon.svg" />
</svelte:head>

<WavePage>
  <header>
    <h1>Korean Time</h1>
  </header>

  <main>
    <Display />

    <div class="inputWrapper">
      <Input />
    </div>

    <div class="togglesContainer">
      <span class="answerSwitch">
        <VisibilitySwitch bind:checked={$showGoalAnswer} label="answer" labelPosition="right" size="lg" />
      </span>

      <p class="hint">{$hint ?? ' '}</p>

      <span class="directionBtn">
        <DirectionBtn />
      </span>
    </div>
  </main>
</WavePage>

<style>
  header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary2);
    margin-bottom: 2rem;
  }
  main {
    text-align: center;
  }
  .inputWrapper {
    display: grid;
    height: 3rem;
    margin: 0 0 1rem 0;
  }
  .answerSwitch {
    grid-area: answer;
  }
  .directionBtn {
    grid-area: direction;
  }
  .hint {
    grid-area: hint;
    display: grid;
    place-content: center;
    color: var(--secondary5);
    height: 3rem;
    font-size: 0.75rem;
  }
  .togglesContainer {
    display: grid;
    grid-template-areas: 'answer direction' 'hint hint';
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .togglesContainer :global(.visibilitySwitchWrapper) {
    justify-content: center;
  }
  @media only screen and (min-width: 600px) {
    .hint {
      font-size: 1rem;
    }
    .inputWrapper {
      margin-top: 2rem;
    }
  }
  @media only screen and (min-width: 800px) {
    .hint {
      font-size: 1.5rem;
    }
    .togglesContainer {
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas: 'answer hint direction';
    }
  }
</style>
