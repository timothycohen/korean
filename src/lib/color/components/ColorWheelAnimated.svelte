<script lang="ts">
  import { fadeSpin, defaultFadeSpin } from '$animations';
  import ColorWheel from '$common/components/ColorWheel.svelte';
  import StreakCounter from '$color/components/StreakCounter.svelte';
  import { colors, allColors, showAnswer } from '$color/stores';
</script>

{#key $colors.color.hex}
  <div class="animation-wrapper" in:fadeSpin={defaultFadeSpin}>
    <ColorWheel
      allColorHexes={$allColors.map(c => c.hex)}
      picked={{ hex: $colors.color.hex, removeFromOuter: $showAnswer }}
    >
      <StreakCounter />
    </ColorWheel>
  </div>
{/key}

<style>
  .animation-wrapper {
    height: 100%;
    width: 100%;
  }
</style>
