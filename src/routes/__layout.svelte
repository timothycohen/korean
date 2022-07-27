<script lang="ts">
  import '$assets/global.css';
  import '$assets/tailwind.css';
  import '$assets/fonts/hostedFonts.css';

  // lucia only auto refreshes tokens on server side navigation
  // on the client we use autoRefreshTokens
  import { autoRefreshTokens } from 'lucia-sveltekit/client';
  import { session } from '$app/stores';
  import { onDestroy } from 'svelte';

  const unsubscribe = autoRefreshTokens(session, e => console.error(e));
  onDestroy(unsubscribe);
</script>

<slot />
