<script lang="ts">
  import Button from '$common/components/ButtonLanguageDirection.svelte';
  import { direction } from '$number/stores';
</script>

<!-- ariaLabel={$direction === 'seeNumTypeKo' ? 'change to hangul input' : 'change to number input'} -->
<Button on:click={direction.toggle} direction={$direction === 'seeNumTypeKo' ? 'left' : 'right'} labelLeft="한글">
  <svg class="iconRight" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M19 5H5v14h14V5zm-5 12h-2V9h-2V7h4v10z" opacity=".3" />
    <path
      d="M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2zM5 5h14v14H5V5zm5 4h2v8h2V7h-4z"
    />
  </svg>
</Button>
