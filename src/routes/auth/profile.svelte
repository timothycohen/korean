<script lang="ts">
  // eslint can't find App, but ts sees it so ¯\_(ツ)_/¯
  // eslint-disable-next-line no-undef
  export let server_sesh: App.Locals['session'] = undefined;
  // import { session } from '$app/stores';
  import { getUserEmail, signOut } from '$db/client';
</script>

<div class="wrapper">
  <div>server session: {server_sesh?.access_token}</div>
  <!-- <div>client session: {JSON.stringify($session)}</div> -->
  <div>supabase session: {JSON.stringify(getUserEmail())}</div>
  <button on:click={signOut}>sign out</button>
</div>

<style>
</style>
