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
  .layout-wave :global(.input-wrapper) {
    display: grid;
    height: 3rem;
    margin: 0 0 1rem;
  }
  .layout-wave :global(.answer-switch) {
    grid-area: answer;
    display: grid;
    justify-content: center;
  }
  .layout-wave :global(.direction-btn) {
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
  .layout-wave :global(.toggles-container) {
    display: grid;
    grid-template: 'answer direction' 'hint hint';
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media only screen and (min-width: 600px) {
    .layout-wave :global(.hint) {
      font-size: 1rem;
    }
    .layout-wave :global(.input-wrapper) {
      margin-top: 2rem;
    }
  }
  @media only screen and (min-width: 800px) {
    .layout-wave :global(.hint) {
      font-size: 1.5rem;
    }
    .layout-wave :global(.toggles-container) {
      grid-template: 'answer hint direction';
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* /numbers and /time Input components */
  .layout-wave :global(.wave-page-input) {
    width: 100%;
    height: 3.25rem;
    font-size: 2rem;
    padding: 0 3rem 0 0.5rem;
    text-align: center;
    border: 3px solid var(--primary2);
    border-radius: 4px;
    outline: none;
    color: black;
  }
  .layout-wave :global(.wave-page-input:focus-visible) {
    border: 3px solid var(--primary4);
  }
  .layout-wave :global(.ko) {
    font-family: var(--font-ko);
  }
  .layout-wave :global(.en) {
    font-family: var(--font-en);
  }
  .layout-wave :global(.visibility-icon-wrapper) {
    position: relative;
    display: grid;
    height: 3.5rem;
    justify-self: right;
    top: -3.25rem;
    right: 0.75rem;
  }
</style>
