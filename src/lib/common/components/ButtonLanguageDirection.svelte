<script lang="ts">
  import Button from '$common/components/Button.svelte';
  import Icon from '$common/components/Icon.svelte';

  export let direction: 'left' | 'right' = 'left';
  export let labelLeft = '';
  export let labelRight = '';
</script>

<Button on:click>
  <div class="container">
    <span class="hangul">{labelLeft}</span>
    <div class="{direction} icon">
      <Icon name="right" stroke="currentColor" color="currentColor" height="75%" />
    </div>
    <span class="english" style="font-size: {(7.5 / labelRight.length) * 0.7}rem;">{labelRight}</span>
  </div>
</Button>

<style>
  .container {
    display: grid;
    grid-template-columns: 2.5rem 1.5rem 1fr;
    padding: 0 0.75rem;
    align-items: center;
  }
  .icon {
    transition: transform 400ms ease-in-out;
    transform-origin: center;
  }
  .hangul {
    font-family: 'GowunDodum';
    font-size: 1.2rem;
    font-weight: 700;
  }
  .english {
    font-family: BioRhyme;
    font-weight: 500;
    text-transform: uppercase;
  }
  .left {
    transform: rotate(180deg);
  }
  .right {
    transform: rotate(0deg);
  }
</style>
