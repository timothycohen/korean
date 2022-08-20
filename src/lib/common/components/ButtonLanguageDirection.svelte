<script lang="ts">
  import Button from '$common/components/Button.svelte';
  import Icon from '$common/components/Icon.svelte';

  export let direction: 'left' | 'right' = 'left';
  export let labelLeft = '';
  export let labelRight = '';

  let containerGTC = labelRight ? 'auto 1.2rem auto' : 'auto 1.2rem 1.5rem';
</script>

<Button on:click>
  <div class="container" style="grid-template-columns: {containerGTC};">
    <span class="grid-left">{labelLeft}</span>

    <div class="{direction} grid-center">
      <Icon name="right" stroke="currentColor" color="currentColor" />
    </div>

    <span class="grid-right">
      <slot>
        {labelRight}
      </slot>
    </span>
  </div>
</Button>

<style>
  .container {
    display: grid;
    align-items: center;
    gap: 0.3rem;
  }
  .grid-left {
    font-family: var(--font-ko);
    font-size: 1.2rem;
    font-weight: 700;
  }
  .grid-center {
    transition: transform 400ms ease-in-out;
    transform-origin: center;
  }
  .grid-right {
    font-family: var(--font-en);
    font-weight: 500;
    text-transform: uppercase;
    font-size: 1rem;
    display: grid;
    width: 100%;
    place-items: center;
  }
  .left {
    transform: rotate(180deg);
  }
  .right {
    transform: rotate(0deg);
  }
</style>
