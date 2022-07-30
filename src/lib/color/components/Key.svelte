<script lang="ts">
  import { showKey, allColors } from '$color/stores';
  import '$animations/fade.css';
</script>

{#if $allColors && $showKey}
  <div class="blackContainer keyContainer fade fadeUpAndIn">
    {#each $allColors as c}
      <span
        style="color: {c.hex}; background-color: {c.Korean === '까만색' || c.Korean === '남색' || c.Korean === '보라색'
          ? 'white'
          : 'transparent'};"
        tabIndex={showKey ? 0 : -1}
        role="img"
        lang="ko"
        aria-label={`${c.English} is ${c.Korean}`}
      >
        {c.Korean}
      </span>
    {/each}
  </div>
{/if}

<style>
  .keyContainer {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
    font-size: 1.5rem;
    justify-content: center;
    align-self: start;
  }

  span {
    font-family: GowunDodum;
    border-radius: 4px;
    font-weight: 700;
  }

  @media only screen and (min-width: 600px) {
    .keyContainer {
      font-size: 2rem;
      width: 80%;
    }
  }
</style>
