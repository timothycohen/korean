<script lang="ts">
  export let checked: boolean;
  export let label = '';
  export let labelPosition: 'left' | 'right' = 'left';
  let areas = labelPosition === 'left' ? `'label checkbox'` : `'checkbox label'`;
  export let size = 'lg';
  export let name = label;
</script>

<div class="visibilitySwitchWrapper" style="--areas: {areas};">
  <label for={name}>
    {label}
  </label>
  <input type="checkbox" {name} class="toggle toggle-{size} toggle-primary" bind:checked />
</div>

<style>
  .visibilitySwitchWrapper {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: start;
    gap: 0.5rem;
    padding: 0.5rem;
    font-size: 1.3rem;
    grid-template-areas: var(--areas);
  }
  input {
    grid-area: checkbox;
  }
  label {
    grid-area: label;
    text-transform: capitalize;
    color: var(--primary2);
  }
</style>
