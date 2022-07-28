<script lang="ts">
  import { slide } from 'svelte/transition';
  import { clickOutside } from '$common/actions';
  import type { drawerStore } from '$common/stores';

  export let drawer: ReturnType<typeof drawerStore>;
  export let selectorsImmuneToClickOutside: string[] = [];
</script>

{#if $drawer}
  <div
    transition:slide={{ duration: 300 }}
    class="bottom_drawer"
    use:clickOutside={selectorsImmuneToClickOutside.map(s => document.querySelector(s))}
    on:outclick|stopPropagation={() => {
      drawer.close();
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
    left: 0;
    width: 100%;
    height: 65%;
  }
  @media only screen and (min-width: 650px) {
    .bottom_drawer {
      height: 25rem;
    }
  }
</style>
