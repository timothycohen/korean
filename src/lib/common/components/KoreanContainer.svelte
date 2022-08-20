<script lang="ts">
  import '$animations/fade.css';
  export let color = '';
  export let bg = '';
  export let text = '';
</script>

<div class="black-container korean-container fade fade-down-and-in">
  <h1 style="color: {color}; background-color: {bg}" lang="ko">
    {text}
  </h1>
  <slot />
</div>

<style>
  .korean-container {
    display: grid;
    align-items: center;
    word-break: keep-all;
  }
  .korean-container h1 {
    font-family: var(--font-ko);
    font-size: 4rem;
    border-radius: 4px;
    padding: 0 1rem;
  }
  @media only screen and (min-width: 600px) {
    .korean-container {
      line-height: 1.4;
      grid-auto-flow: column;
      align-items: end;
      gap: 0.75rem;
    }
    .korean-container h1 {
      font-size: 5rem;
      font-weight: 700;
    }
  }
</style>
