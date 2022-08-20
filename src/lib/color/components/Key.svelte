<script lang="ts">
  import { showKey, allColors } from '$color/stores';
  import '$animations/fade.css';
</script>

{#if $allColors && $showKey}
  <div class="black-container key-container fade fade-up-and-in">
    {#each $allColors as c}
      <span
        style="color: {c.hex}; background-color: {c.korean === '까만색' || c.korean === '남색' || c.korean === '보라색'
          ? 'white'
          : 'transparent'};"
        tabIndex={showKey ? 0 : -1}
        role="img"
        lang="ko"
        aria-label={`${c.english} is ${c.korean}`}
      >
        {c.korean}
      </span>
    {/each}
  </div>
{/if}

<style>
  .key-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
    font-size: 1.5rem;
    justify-content: center;
    align-self: start;
  }
  span {
    font-family: var(--font-ko);
    border-radius: 4px;
    font-weight: 700;
  }

  @media only screen and (min-width: 600px) {
    .key-container {
      font-size: 2rem;
      width: 80%;
    }
  }
</style>
