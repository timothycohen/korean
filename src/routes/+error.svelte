<script lang="ts">
  import { page } from '$app/stores';
  let isProduction = import.meta.env.MODE === 'production';
</script>

{#if isProduction}
  {#if $page.status === 404}
    <h1>404</h1>
    <h1>Couldn't find {$page.url.pathname}</h1>
  {:else}
    <h1>Something went wrong!</h1>
  {/if}
  <a href="/">Home</a>
{:else}
  <h1>{$page.status}</h1>
  <h1>{$page.error.message}</h1>
  <h1>{$page.error.stack}</h1>
{/if}
