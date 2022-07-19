<script lang="ts">
  import '$animations/fade.css';
  export let color = '';
  export let bg = '';
  export let text = '';
</script>

<div class="blackContainer koreanContainer fade fadeDownAndIn">
  <h1 style="color: {color}; background-color: {bg}" lang="ko">
    {text}
  </h1>
  <slot />
</div>

<style>
  .koreanContainer {
    display: grid;
    align-items: center;
    word-break: keep-all;
  }
  .koreanContainer h1 {
    font-family: GowunDodum;
    font-size: 4rem;
    border-radius: 4px;
    padding: 0rem 1rem;
  }
  @media only screen and (min-width: 600px) {
    .koreanContainer {
      line-height: 1.4;
      grid-auto-flow: column;
      align-items: end;
      gap: 0.75rem;
    }
    .koreanContainer h1 {
      font-size: 5rem;
      font-weight: 700;
    }
  }
</style>
