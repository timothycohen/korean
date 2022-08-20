<script lang="ts">
  import { streakCounter } from '$color/stores';
</script>

{#if $streakCounter.on}
  <span class="streak-counter"><span>{$streakCounter.value.toString()}</span></span>
{/if}

<style>
  .streak-counter {
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
  }
  .streak-counter span {
    background-color: whitesmoke;
    border-radius: 50%;
    height: 25%;
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    padding-bottom: 2%;
  }
</style>
