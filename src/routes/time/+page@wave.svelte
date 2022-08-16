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
  <link rel="icon" href="/favicon-time.png" />
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
