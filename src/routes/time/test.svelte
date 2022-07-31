<script lang="ts">
  import WavePageBuilder from '$tools/WavePageBuilder.svelte';
  import type { TargetParams } from '$tools/target';

  type ParamsGroup = [TargetParams, TargetParams, TargetParams];
  const start: TargetParams = { x: 0, y: 200, radius: 10, type: 'point' };
  const points: ParamsGroup[] = [
    [
      { x: 245, y: 300, radius: 15, type: 'control1' },
      { x: 500, y: 260, radius: 15, type: 'control2' },
      { x: 900, y: 210, radius: 15, type: 'point' },
    ],
    [
      { x: 1150, y: 175, radius: 20, type: 'control1' },
      { x: 1340, y: 175, radius: 20, type: 'control2' },
      { x: 1440, y: 225, radius: 20, type: 'point' },
    ],

    [
      { x: 1440, y: 0, radius: 25, type: 'control1' },
      { x: 1440, y: 0, radius: 25, type: 'control2' },
      { x: 1440, y: 0, radius: 25, type: 'point' },
    ],
    [
      { x: 0, y: 0, radius: 30, type: 'control1' },
      { x: 1440, y: 0, radius: 30, type: 'control2' },
      { x: 0, y: 0, radius: 30, type: 'point' },
    ],
  ];
</script>

<WavePageBuilder {start} {points} showTargets={false} />
