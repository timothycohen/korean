<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  // redirect if already logged in
  export const load: Load = async ({ session }) => {
    if (session.lucia) {
      return { status: 302, redirect: '/auth/profile' };
    }
  };
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { toggleStore } from '$common/stores';

  // email and password
  let email = '';
  let password = '';
  let error = ' ';
  let create = toggleStore(false, true);

  const authenticate = async (type: 'signup' | 'signin') => {
    let url = type === 'signup' ? '/api/auth/signup' : 'api/auth/signin';
    error = ' ';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) return (window.location.href = '/');
    const result = await response.json();
    error = result.error ?? 'Unable to login';
  };

  onMount(() => {
    // (imported in svelte:head below and declared in app.d.ts)
    // eslint-disable-next-line no-undef
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      cancel_on_tap_outside: true,
      callback: async ({ credential }) => {
        const response = await fetch('/api/auth/oauth/google', {
          method: 'POST',
          body: JSON.stringify({
            code: credential,
          }),
          redirect: 'follow',
        });
        if (response.ok) {
          goto('/');
        } else {
          console.error('error' + response);
        }
      },
    });

    // (imported in svelte:head below and declared in app.d.ts)
    // eslint-disable-next-line no-undef
    google.accounts.id.renderButton(document.getElementById('googleBtn') as HTMLElement, {
      theme: 'filled_black',
      size: 'large',
      width: `${500 / 2 - 16 / 2}px`,
      type: 'standard',
      text: 'signin_with',
      logo_alignment: 'center',
    });
  });
</script>

<svelte:head>
  <script src="https://accounts.google.com/gsi/client"></script>
</svelte:head>

<form on:submit|preventDefault={$create ? () => authenticate('signup') : () => authenticate('signin')}>
  <div class="manual">
    <label for="email">email</label>
    <input type="email" id="email" bind:value={email} on:keydown={() => (error = ' ')} required />
    <label for="password">password</label>
    <input type="password" id="password" bind:value={password} on:keydown={() => (error = ' ')} required />
    <button type="submit" class="btn">{$create ? 'Create account' : 'Sign in'}</button>
    <p>
      {$create ? 'Have an account?' : 'New here?'}
      <button
        type="button"
        class="text-blue-300"
        on:click={() => {
          create.toggle();
          error = ' ';
        }}>{$create ? 'Sign in.' : 'Create an account.'}</button
      >
    </p>
    <p class="error">{error}</p>
  </div>

  <div class="divider mb-8">
    <p class="font-semibold mx-4">OR</p>
  </div>

  <div class="oauth">
    <a
      class="github"
      href={`https://github.com/login/oauth/authorize?client_id=${
        import.meta.env.VITE_GITHUB_CLIENT_ID
      }&scope=user:email`}
    >
      <span> Sign in with GitHub </span>

      <div class="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
          <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            fill="black"
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
          />
        </svg>
      </div>
    </a>

    <span id="googleBtn" class="googleBtn" />
  </div>
</form>

<style>
  form {
    width: 500px;
    margin: auto;
    padding: 2rem 0;
  }
  .manual {
    display: grid;
    row-gap: 0.5rem;
  }
  .oauth {
    display: grid;
    column-gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }

  input {
    height: 2.5rem;
  }
  input:last-of-type {
    margin-bottom: 1.25rem;
  }
  a {
    background-color: black;
    border-radius: 4px;
    height: 2.5rem;
  }
  a {
    display: grid;
    place-content: center;
  }
  .googleBtn {
    display: grid;
    justify-content: center;
    width: 100%;
  }
  .github {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: column;
  }
  .github span {
    display: grid;
    place-content: center;
  }
  .github .svg-container {
    width: 40px;
    height: 40px;
    background-color: white;
    display: grid;
    place-content: center;
    border-radius: 0 4px 4px 0;
  }
  .github .svg-container svg {
    width: 30px;
    height: 30px;
  }
  .error {
    height: 0.8rem;
  }
</style>
