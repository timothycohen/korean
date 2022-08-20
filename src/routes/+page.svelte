<script lang="ts">
  import Counter from '$lib/home/components/Counter.svelte';
  import { colors, time, numbers } from '$assets/images';
  import AnalogClock from '$common/components/AnalogClock.svelte';
  import { fadeSpin } from '$animations';
  import { onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

  const apps = [
    { name: 'Colors', href: '/colors', src: colors },
    { name: 'Numbers', href: '/numbers', src: numbers },
    { name: 'Time', href: '/time', src: time },
  ];
  let appIndex = 0;

  const nextApp = () => {
    appIndex++;
    if (appIndex === apps.length) appIndex = 0;
  };

  $: hour = new Date().getHours();
  $: minute = new Date().getMinutes();
  let interval = setInterval(() => (minute += 1), 500);
  onDestroy(() => clearInterval(interval));

  const fadeSpinConfig = {
    delay: 150,
    duration: 500,
    start: { opacity: 0.01, scale: 0.5, rotate: -360 },
    end: { opacity: 1, scale: 1, rotate: 0 },
  };
</script>

<svelte:head>
  <title>Korean Apps</title>
  <link rel="icon" href="/favicon-home.svg" />
</svelte:head>

<main>
  <div class="app-selection">
    <div class="feature" style="grid-area: feature;">
      {#if apps[appIndex].name === 'Colors'}
        <span class="feature-colors" on:click={nextApp}>
          <img
            src="/favicon-colors.svg"
            alt=""
            on:contextmenu|preventDefault
            in:fadeSpin={fadeSpinConfig}
            out:fade|local={{ duration: 150 }}
          />
        </span>
      {:else if apps[appIndex].name === 'Numbers'}
        <span
          class="feature-numbers"
          on:click={nextApp}
          in:fade|local={{ delay: 150, duration: 300 }}
          out:fade|local={{ duration: 150 }}
        >
          <Counter />
        </span>
      {:else}
        <span
          class="feature-time"
          on:click={nextApp}
          in:fade|local={{ delay: 150, duration: 300 }}
          out:fade|local={{ duration: 150 }}
        >
          {#key minute}
            <AnalogClock size={150} {hour} {minute} />
          {/key}
        </span>
      {/if}
    </div>

    {#each apps as { href, src, name }, index}
      <div
        class="preview-link-wrapper"
        style="grid-area: {name.toLowerCase()}; transform: scale({apps[appIndex].name === name ? 1 : 0.8});"
      >
        <a
          class="preview-link"
          {href}
          sveltekit:prefetch
          on:mouseover={() => (appIndex = index)}
          on:focus={() => (appIndex = index)}
          on:contextmenu|preventDefault
        >
          <span>{name}</span>
          <img {src} alt="" width={500} height={379} class={apps[appIndex].name === name ? ' targeted' : ''} />
        </a>
      </div>
    {/each}
  </div>
</main>

<style>
  main {
    min-height: 100%;
    width: 100%;
    background-color: black;
    padding: 2rem;
  }
  .app-selection {
    display: grid;
    gap: 1rem;
    grid-template:
      '. . feature feature feature feature . .'
      '. . colors colors colors colors . .'
      'numbers numbers numbers numbers time time time time';
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(3, 1fr);
    background-color: black;
    place-items: center;
  }

  .feature {
    grid-area: feature;
    overflow: hidden;
    width: min(23vh, 50vw);
    aspect-ratio: 1 / 1;
  }
  .feature-colors img {
    animation: spin 6000ms infinite ease-in-out;
  }
  .feature-time {
    display: grid;
    place-content: center;
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  .preview-link-wrapper {
    transition: all 300ms;
    text-align: center;
    color: var(--primary2);
    font-size: 2rem;
  }
  .preview-link:hover {
    opacity: 0.75;
  }
  .preview-link * {
    transition: transform 300ms ease-in-out;
    transform: scale(0.98);
  }
  .preview-link:hover * {
    transform: scale(1);
  }
  .preview-link img {
    object-fit: contain;
  }

  @media only screen and (min-width: 600px) {
    .preview-link-wrapper {
      font-size: 3rem;
    }
  }

  /* @media only screen and (min-width: 600px) and (max-height: 900px) { */
  @media (min-aspect-ratio: 1/1) {
    .app-selection {
      grid-template:
        '. . feature feature feature feature . .'
        '. colors colors numbers numbers time time .';
      grid-template-rows: repeat(2, 1fr);
    }
  }

  @media (min-aspect-ratio: 2/1) {
    .app-selection {
      grid-template: 'feature feature colors colors numbers numbers time time';
      grid-template-rows: repeat(1, 1fr);
    }
  }

  @keyframes spin {
    0% {
      opacity: 1;
      filter: saturate(100%);
      transform: rotate(0deg) scale(1);
    }
    90% {
      opacity: 0.3;
      filter: saturate(15%);
      transform: rotate(648deg) scale(0.85);
    }
    100% {
      opacity: 1;
      filter: saturate(100%);
      transform: rotate(720deg) scale(1);
    }
  }
</style>
