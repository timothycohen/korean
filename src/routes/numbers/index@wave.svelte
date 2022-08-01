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
    <DirectionBtn />
    <VisibilitySwitch label="Input as Hangul" labelPosition="right" bind:checked={$showParsedInput} />
  </div>
</Drawer>
