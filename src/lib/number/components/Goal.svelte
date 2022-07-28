<script lang="ts">
  export let numOrHan: 'num' | 'han';
  export let koreanAriaLabel: string;
  export let englishAriaLabel: string;
  export let tabindex = 0;
</script>

<h1
  aria-label={numOrHan === 'han' ? koreanAriaLabel : englishAriaLabel}
  {tabindex}
  lang={numOrHan === 'han' ? 'ko' : 'en'}
  style={`font-family: ${numOrHan === 'han' ? 'GowunDodum' : 'BioRhyme'}`}
>
  <slot />
</h1>

<style>
  h1 {
    font-size: clamp(1.8rem, 1.25rem + 3.3333vw, 3rem);
    min-height: 3rem;
    width: 100%;
    color: var(--gray5);
    font-weight: 700;
  }
</style>
