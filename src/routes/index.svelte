<script lang="ts">
  import AppPreviewLink from '$common/components/AppPreviewLink.svelte';
  import { colors, time, numbers } from '$assets/images';

  const apps = [
    {
      name: 'Colors',
      href: '/colors',
      src: colors,
    },
    {
      name: 'Time',
      href: '/time',
      src: time,
    },
    {
      name: 'Numbers',
      href: '/numbers',
      src: numbers,
    },
  ];
</script>

<svelte:head>
  <title>Korean Apps</title>
  <link rel="icon" href="/favicon-home.svg" />
</svelte:head>

<!-- Capture screenshot: chrome dev tools ⌘ ⇧ P -->
<main>
  <h1 class="title">TCo's Korean Apps</h1>
  <div class="container">
    {#each apps as { href, src, name }}
      <AppPreviewLink {href} {src} {name} />
    {/each}
  </div>
</main>

<style>
  .title {
    padding: 1.5rem;
    font-size: 2rem;
    font-weight: 700;
  }

  .container {
    display: grid;
    place-content: flex-start;
    padding: 1rem;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  @media only screen and (min-width: 1536px) {
    .container {
      grid-template-columns: repeat(3, auto);
    }
  }
</style>
