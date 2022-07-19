<script lang="ts">
  import Button from '$common/components/Button.svelte';
  import Icon from '$common/components/Icon.svelte';

  export let direction: 'left' | 'right' = 'left';
  export let labelLeft = '';
  export let labelRight = '';
</script>

<Button on:click>
  <div>
    <span class="hangul">{labelLeft}</span>
    <div class="{direction} icon"><Icon name="right" stroke="currentColor" color="currentColor" height="75%" /></div>
    <span class="english">{labelRight}</span>
  </div>
</Button>

<style>
  div {
    display: grid;
    grid-auto-flow: column;
    padding: 4px 12px;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .icon {
    padding: 0;
    margin: 0;
    transition: transform 400ms ease-in-out;
    transform-origin: center;
  }
  .hangul {
    font-family: 'GowunDodum';
    font-size: 1.2rem;
    font-weight: 700;
  }
  .english {
    text-transform: uppercase;
    font-family: BioRhyme;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.75;
  }
  .left {
    transform: rotate(180deg);
  }
  .right {
    transform: rotate(0deg);
  }
</style>
