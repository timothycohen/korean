<script lang="ts">
  import DirectionBtn from '$number/components/DirectionBtn.svelte';
  import { drawer, showGoalAnswer, showParsedInput, hint } from '$number/stores';
  import WavePage from '$common/components/WavePage.svelte';
  import { goal } from '$number/stores';
  import Display from '$lib/number/components/Display.svelte';
  import VisibilitySwitch from '$common/components/VisibilitySwitch.svelte';
  import Input from '$number/components/Input.svelte';
  import Drawer from '$common/components/Drawer.svelte';
  import HangulNumberTypeSelect from '$number/components/HangulNumberTypeSelect.svelte';
  import RangeSlider from '$lib/number/components/RangeSlider.svelte';
</script>

<svelte:head>
  <title>Numbers | {$goal.type.replace(/^./, str => str.toUpperCase())}</title>
  <link rel="icon" href="/favicon-numbers.svg" />
</svelte:head>

<WavePage shimmer={$drawer}>
  <header>
    <h1>Korean Numbers</h1>

    <button class="settingsBtn" on:click={drawer.toggle}>Settings</button>
  </header>

  <main style={`filter: ${$drawer ? 'var(--shimmer)' : ''}`}>
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

<Drawer {drawer} selectorsImmuneToClickOutside={['.settingsBtn']} height="max(450px, 55%)">
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
    <DirectionBtn --height="100%" />
    <VisibilitySwitch label="Input as Hangul" labelPosition="right" bind:checked={$showParsedInput} />
  </div>
</Drawer>

<style>
  .settingsBtn {
    font-family: SpaceMono;
    text-transform: lowercase;
    background-color: var(--gray5);
    border: 4px solid var(--primary2);
    border-radius: 0px;
    padding: 0.5rem;
    font-size: 1rem;
    color: var(--primary2);
    height: 4rem;
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
    display: flex;
    flex-wrap: wrap;
    place-content: space-around;
  }
  @media only screen and (min-width: 800px) {
    .drawer-toggles {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      gap: 1rem;
    }
  }
</style>
