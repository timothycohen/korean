<script lang="ts">
  import WavePage from '$common/components/WavePage.svelte';
  import DirectionBtn from '$time/components/DirectionBtn.svelte';
  import { showGoalAnswer, direction, hint } from '$time/stores';
  import VisibilitySwitch from '$common/components/VisibilitySwitch.svelte';
  import Input from '$time/components/Input.svelte';
  import UserHangulGoalHHMM from '$lib/time/components/UserHangulGoalHHMM.svelte';
  import UserHHMMGoalHangul from '$lib/time/components/UserHHMMGoalHangul.svelte';
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
    <div class="detailsWrapper">
      {#if $direction === 'userHHMMGoalHangul'}
        <UserHHMMGoalHangul />
      {:else}
        <UserHangulGoalHHMM />
      {/if}
    </div>

    <div class="inputWrapper">
      <Input />
    </div>

    <div class="togglesContainer">
      <VisibilitySwitch bind:checked={$showGoalAnswer} label="answer" labelPosition="right" size="lg" />
      <p class="hint">{$hint ?? ' '}</p>
      <DirectionBtn
        on:click={direction.toggle}
        direction={$direction === 'userHHMMGoalHangul' ? 'left' : 'right'}
        labelLeft="한글"
      />
    </div>
  </main>
</WavePage>

<style>
  header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary2);
  }
  main {
    text-align: center;
  }
  .detailsWrapper {
    height: 320px;
    margin-top: 5rem;
  }
  .inputWrapper {
    display: grid;
    height: 3rem;
    margin: 2rem 0 1rem 0;
  }
  .togglesContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    place-content: center;
    width: 100%;
    gap: 2rem;
  }
  .hint {
    display: grid;
    place-content: center;
    color: var(--secondary5);
    height: 3rem;
    font-size: 0.75rem;
  }
  .togglesContainer :global(.visibilitySwitchWrapper) {
    justify-content: center;
  }
  @media only screen and (min-width: 600px) {
    .hint {
      font-size: 1rem;
    }
  }
  @media only screen and (min-width: 800px) {
    .hint {
      font-size: 1.5rem;
    }
    .togglesContainer {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
