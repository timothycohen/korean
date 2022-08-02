<span class="layout-wave">
  <slot />
</span>

<style>
  /* /numbers and /time index pages */
  .layout-wave :global(header) {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-flow: column;
    align-items: center;
    margin-bottom: 2rem;
    height: 4rem;
  }
  .layout-wave :global(header h1) {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary2);
  }
  .layout-wave :global(main) {
    text-align: center;
  }
  .layout-wave :global(.inputWrapper) {
    display: grid;
    height: 3rem;
    margin: 0 0 1rem 0;
  }
  .layout-wave :global(.answerSwitch) {
    grid-area: answer;
  }
  .layout-wave :global(.directionBtn) {
    grid-area: direction;
  }
  .layout-wave :global(.hint) {
    grid-area: hint;
    display: grid;
    place-content: center;
    color: var(--secondary5);
    height: 3rem;
    font-size: 0.75rem;
  }
  .layout-wave :global(.togglesContainer) {
    display: grid;
    grid-template-areas: 'answer direction' 'hint hint';
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media only screen and (min-width: 600px) {
    .layout-wave :global(.hint) {
      font-size: 1rem;
    }
    .layout-wave :global(.inputWrapper) {
      margin-top: 2rem;
    }
  }
  @media only screen and (min-width: 800px) {
    .layout-wave :global(.hint) {
      font-size: 1.5rem;
    }
    .layout-wave :global(.togglesContainer) {
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas: 'answer hint direction';
    }
  }

  /* /numbers and /time Input components */
  .layout-wave :global(.wave-page-input) {
    width: 100%;
    height: 3rem;
    font-size: clamp(1rem, 5.25vw, 2.5rem);
    padding: 0 3rem;
    text-align: center;
    border: 2px solid var(--primary2);
    border-radius: 4px;
    color: black;
  }
  .layout-wave :global(.wave-page-input:focus-visible) {
    border: 2px solid transparent;
    outline: 2px solid var(--primary4);
  }
  .layout-wave :global(.wave-page-input::-webkit-clear-button),
  .layout-wave :global(.wave-page-input::-webkit-outer-spin-button),
  .layout-wave :global(.wave-page-input::-webkit-inner-spin-button) {
    display: none;
  }
  .layout-wave :global(.ko) {
    font-family: 'GowunDodum';
  }
  .layout-wave :global(.en) {
    font-family: 'BioRhyme';
  }
  .layout-wave :global(.visibility-icon-wrapper) {
    position: relative;
    justify-self: right;
    top: -2.4rem;
    right: 0.5rem;
    height: 2rem;
    width: 2rem;
  }
</style>
