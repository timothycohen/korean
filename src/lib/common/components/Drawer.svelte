<script lang="ts">
  import { slide } from 'svelte/transition';
  import { clickOutside } from '$common/actions';
  import type { drawerStore } from '$common/stores';
  import { browser } from '$app/env';

  export let drawer: ReturnType<typeof drawerStore>;
  export let selectorsImmuneToClickOutside: string[] = [];
  export let height = '55%';

  if (browser) {
    document.onkeydown = e => {
      if (e.key === 'Escape') {
        drawer.close();
      }
    };
  }
</script>

{#if $drawer}
  <div
    transition:slide={{ duration: 300 }}
    style="--height: {height};"
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
    height: var(--height);
    display: grid;
  }
</style>
