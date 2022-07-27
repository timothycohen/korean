<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ session }) => {
    if (!session.lucia) {
      return { status: 302, redirect: '/auth' };
    }
  };
</script>

<script lang="ts">
  import { signOut } from 'lucia-sveltekit/client';
  import { session } from '$app/stores';

  const signOutUser = async (redirect?: string) => {
    try {
      await signOut();
    } catch (err) {
      console.error('Unable to sign out');
    }
    if (redirect) {
      window.location.href = redirect;
    }
  };

  let asset = '';
  const getProtectedAsset = async () => {
    asset = '...';

    const response = await fetch('/api/auth/asset', {
      headers: { Authorization: `Bearer ${$session.lucia?.access_token}` },
    });
    if (!response.ok) {
      if (response.status === 401) {
        asset = 'Unauthorized';
        return;
      }
    }
    const result = await response.json();
    asset = result.asset;
  };
</script>

<div>
  {#if $session.lucia}
    <p>Welcome {$session.lucia.user.email}</p>
    <button
      on:click={() => {
        signOutUser('/');
      }}>Sign Out</button
    >
    <button
      on:click={() => {
        signOutUser('/auth');
      }}>Change users</button
    >
  {:else}
    Please <a href="/auth">sign in</a>
  {/if}

  <button on:click={getProtectedAsset}>get protected asset</button>
  <p>asset: {asset}</p>
</div>
