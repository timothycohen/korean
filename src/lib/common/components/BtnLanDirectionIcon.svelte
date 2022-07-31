<script lang="ts">
  import Button from '$common/components/Button.svelte';
  import Icon from '$common/components/Icon.svelte';

  export let direction: 'left' | 'right' = 'left';
  export let labelLeft = '';
</script>

<Button on:click width="125">
  <div class="container">
    <span class="hangul">{labelLeft}</span>

    <div class="{direction} icon">
      <Icon name="right" stroke="currentColor" color="currentColor" />
    </div>

    <slot />
  </div>
</Button>

<style>
  .container {
    display: flex;
    padding: 0 0.5rem;
    place-items: center;
    height: 100%;
    gap: 0.3rem;
  }
  .hangul {
    font-family: 'GowunDodum';
    font-weight: 700;
    font-size: 1.3rem;
    width: 60%;
  }
  .icon {
    transition: transform 400ms ease-in-out;
    transform-origin: center;
    width: 40%;
  }
  .left {
    transform: rotate(180deg);
  }
  .right {
    transform: rotate(0deg);
  }
  .iconRight {
    width: 45%;
  }
</style>
