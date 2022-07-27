<script lang="ts">
  import { slide } from 'svelte/transition';
  import type { Writable } from 'svelte/store';
  import { clickOutside } from '$common/actions';

  export let drawerIsOpen: Writable<boolean>;
</script>

{#if $drawerIsOpen}
  <div
    transition:slide={{ duration: 300 }}
    class="bottom_drawer"
    use:clickOutside
    on:outclick={() => {
      $drawerIsOpen = false;
    }}
  >
    <slot />
  </div>
{/if}

<style>
  .bottom_drawer {
    position: absolute;
    background-color: var(--secondary5);
    color: var(--secondary1);
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
    height: 25rem;
  }
</style>
