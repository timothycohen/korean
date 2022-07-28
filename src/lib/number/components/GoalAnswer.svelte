<script lang="ts">
  export let numOrHan: 'num' | 'han';
  export let koreanAriaLabel: string;
  export let englishAriaLabel: string;
  export let tabindex = 0;
</script>

<h2
  aria-label={numOrHan === 'han' ? koreanAriaLabel : englishAriaLabel}
  {tabindex}
  lang={numOrHan === 'han' ? 'ko' : 'en'}
  style={`font-family: ${numOrHan === 'han' ? 'GoWunDodum' : 'BioRhyme'}; font-weight: ${
    numOrHan === 'han' ? '400' : '300'
  };`}
>
  <slot />
</h2>

<style>
  h2 {
    font-size: clamp(1.5rem, 5vw, 3rem);
    min-height: 4.5rem;
    color: var(--gray5);
  }
</style>
