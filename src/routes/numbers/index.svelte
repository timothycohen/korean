<script lang="ts">
  import DirectionBtn from '$common/components/ButtonLanguageDirection.svelte';
  import { direction, drawer, showGoalAnswer, showParsedInput, hint } from '$number/stores';
  import WavePage from '$common/components/WavePage.svelte';
  import { goal } from '$number/stores';
  import Display from '$lib/number/components/Display.svelte';
  import VisibilitySwitch from '$common/components/VisibilitySwitch.svelte';
  import Input from '$number/components/Input.svelte';
  import Drawer from '$common/components/Drawer.svelte';
  import HangulNumberTypeSelect from '$number/components/HangulNumberTypeSelect.svelte';
  import RangeSlider from '$lib/number/components/RangeSlider.svelte';
  import { browser } from '$app/env';

  if (browser) {
    document.onkeydown = e => {
      if (e.key === 'Escape') {
        drawer.close();
      }
    };
  }
</script>

<svelte:head>
  <title>Numbers | {$goal.type.replace(/^./, str => str.toUpperCase())}</title>
  <link rel="icon" href="/favicon.svg" />
</svelte:head>

<WavePage shimmer={$drawer}>
  <header>
    <h1>Korean Numbers</h1>

    <button class="settingsBtn" on:click={drawer.toggle}> Settings </button>
  </header>

  <main style={`filter: ${$drawer ? 'var(--shimmer)' : ''}`}>
    <Display />
    <!-- ariaLabel={$direction === 'userHanGoalNum' ? 'change to number input' : 'change to hangul input'} -->

    <Input />
    <div class="togglesContainer">
      <VisibilitySwitch bind:checked={$showGoalAnswer} label="answer" labelPosition="right" size="lg" />
      <p class="hint">{$hint ?? ' '}</p>
      <DirectionBtn
        on:click={direction.toggle}
        direction={$direction === 'userHanGoalNum' ? 'left' : 'right'}
        labelLeft="한글"
        labelRight="123"
      />
    </div>
  </main>

  <Drawer {drawer} selectorsImmuneToClickOutside={['.settingsBtn']}>
    <div class="drawer-topbar">
      <h1>Settings</h1>
      <button on:click={() => drawer.close()}>Close</button>
    </div>

    <div class="select-positioner">
      <HangulNumberTypeSelect />
    </div>
    <RangeSlider />

    <div class="drawer-toggles">
      <VisibilitySwitch label="answer" labelPosition="right" bind:checked={$showGoalAnswer} />
      <DirectionBtn
        on:click={direction.toggle}
        direction={$direction === 'userHanGoalNum' ? 'left' : 'right'}
        labelLeft="한글"
        labelRight="123"
      />
      <VisibilitySwitch label="Input as Hangul" labelPosition="right" bind:checked={$showParsedInput} />
    </div>
  </Drawer>
</WavePage>

<style>
  header {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: column;
  }
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary2);
  }
  .settingsBtn {
    font-family: SpaceMono;
    text-transform: lowercase;
    background-color: var(--gray5);
    border: 4px solid var(--primary2);
    border-radius: 0px;
    padding: 0.5rem;
    font-size: 1rem;
    color: var(--primary2);
  }
  main {
    padding-top: 15%;
    display: grid;
    place-items: center;
    text-align: center;
  }
  .togglesContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    place-content: center;
    width: 100%;
    gap: 2rem;
  }
  .togglesContainer :global(*) {
    display: grid;
    justify-content: center;
  }
  .hint {
    display: grid;
    place-content: center;
    color: var(--secondary5);
    height: 3rem;
    font-size: 0.75rem;
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
  .select-positioner {
    padding-top: 1rem;
    text-align: center;
  }
  .drawer-topbar {
    padding: 0.5rem 1rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
    grid-auto-flow: column;
    align-items: baseline;
    margin: 0 1rem;
    padding: 1rem 1.5rem 0.5rem 1.5rem;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  }
  .drawer-topbar h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--secondary1);
  }
  .drawer-topbar button {
    font-size: 1rem;
    color: var(--secondary1);
    text-transform: uppercase;
  }
  .drawer-toggles {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
  }
  @media only screen and (max-width: 800px) {
    .drawer-toggles {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      gap: 1rem;
    }
  }
</style>
