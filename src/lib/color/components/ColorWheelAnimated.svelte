<script lang="ts">
  import { fadeSpin } from '$animations';
  import ColorWheel from '$common/components/ColorWheel.svelte';
  import StreakCounter from '$color/components/StreakCounter.svelte';
  import { colors, allColors } from '$color/stores';

  const fadeSpinIn = {
    start: { opacity: 0.01, scale: 0.8, rotate: -360 },
    end: { opacity: 1, scale: 1, rotate: 0 },
    duration: 250,
  };
</script>

{#key $colors.color.hex}
  <div class="animationWrapper" in:fadeSpin={fadeSpinIn}>
    <ColorWheel pickedHex={$colors.color.hex} allColorHexes={$allColors.map(c => c.hex)}>
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
