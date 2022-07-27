<script lang="ts">
  export let show = true;
  export let tabindex = 0;
  export let ariaLabel = '';
</script>

<h2 lang="ko" {tabindex} aria-label={ariaLabel}>
  {#if show}
    <slot />
  {/if}
</h2>

<style>
  h2 {
    font-size: clamp(2rem, 1.25rem + 3.3333vw, 3rem);
    font-weight: 400;
    min-height: 4.5rem;
    width: 100%;
    font-family: GowunDodum;
    color: var(--gray4);
  }
</style>
