<main class="layout-colors">
  <slot />
</main>

<style>
  main.layout-colors :global(.blackContainer) {
    background-color: black;
    border-radius: 4px;
    margin: 0 auto;
    text-align: center;
    box-shadow: var(--gray3) 0px 1px 0px;
  }
</style>
