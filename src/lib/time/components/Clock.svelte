<script lang="ts">
  import AnalogClock from '$common/components/AnalogClock.svelte';
  import DigitalClock from '$common/components/DigitalClock.svelte';
  import { toggleStore } from '$common/stores';

  export let size = 700;
  export let hour = 6;
  export let minute = 16;
  const view = toggleStore('analog', 'digital');
</script>

<button on:click={view.toggle}>
  {#key `${hour}${minute}`}
    {#if $view === 'analog'}
      <AnalogClock {size} {hour} {minute} />
    {:else}
      <DigitalClock {size} {hour} {minute} />
    {/if}
  {/key}
</button>

<style>
  button {
    outline: none;
    border: none;
    background-color: transparent;
    border-radius: 50%;
    overflow: hidden;
  }
  button:hover {
    background-color: hsla(43.4, 42%, 75%, 0.1);
  }
</style>
