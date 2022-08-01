<script lang="ts">
  import { fadeSpin } from '$animations';
  import ColorWheel from '$common/components/ColorWheel.svelte';
  import StreakCounter from '$color/components/StreakCounter.svelte';
  import { colors, allColors, showAnswer } from '$color/stores';

  const fadeSpinIn = {
    start: { opacity: 0.01, scale: 0.8, rotate: -360 },
    end: { opacity: 1, scale: 1, rotate: 0 },
    duration: 250,
  };
</script>

{#key $colors.color.hex}
  <div class="animationWrapper" in:fadeSpin={fadeSpinIn}>
    <ColorWheel
      allColorHexes={$allColors.map(c => c.hex)}
      picked={{ hex: $colors.color.hex, removeFromOuter: $showAnswer }}
    >
      <StreakCounter />
    </ColorWheel>
  </div>
{/key}

<style>
  .animationWrapper {
    height: 100%;
    width: 100%;
  }
</style>
