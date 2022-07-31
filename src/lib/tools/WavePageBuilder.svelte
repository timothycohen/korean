<script lang="ts">
  import { type TargetParams, createTarget } from '$tools/target';
  export let shimmer = false;
  export let showTargets = true;

  type ParamsGroup = [TargetParams, TargetParams, TargetParams];
  export let start: TargetParams = { x: 0, y: 350, radius: 10, type: 'point' };
  export let points: ParamsGroup[] = [
    [
      { x: 245, y: 500, radius: 15, type: 'control1' },
      { x: 800, y: 330, radius: 15, type: 'control2' },
      { x: 1080, y: 275, radius: 15, type: 'point' },
    ],
    [
      { x: 1250, y: 228, radius: 20, type: 'control1' },
      { x: 1340, y: 250, radius: 20, type: 'control2' },
      { x: 1440, y: 280, radius: 20, type: 'point' },
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

  const createBezierPathAndTargets = (start: TargetParams, paramsGroups: ParamsGroup[]) => {
    const startPath = `M ${start.x},${start.y} `;
    const startTarget = createTarget(start);

    let fullPath = startPath;
    let allTargets = [startTarget];

    paramsGroups.forEach(group => {
      const path = group.reduce((prev, curr) => prev + ` ${curr.x},${curr.y}`, `C`);
      const targets = group.map(createTarget);

      fullPath = fullPath + path + ' ';
      allTargets = [...allTargets, ...targets];
    });

    return {
      fullPath,
      allTargets,
    };
  };

  const { fullPath, allTargets } = createBezierPathAndTargets(start, points);

  const createWaveSVG = (color: string): string => {
    return `<svg alt="" width="100%" height="100%" viewBox="0 0 1440 1440" xmlns="http://www.w3.org/2000/svg">
  <path
    d="${fullPath}"
    stroke="none"
    strokeWidth="0"
    fill='${color}'
  />
  ${showTargets ? allTargets : ''}
  </svg>`;
  };

  const createURL = (color: string): string => {
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(createWaveSVG(color))}")`;
  };

  console.log(fullPath);
</script>

<div class="wavePage" style="--bg-image: {createURL('#353c6d')}; --filter: {shimmer ? 'var(--shimmer)' : ''};">
  <slot />
</div>

<style>
  .wavePage {
    min-height: 100%;
    width: 100%;
    padding: 1rem;
    border: 0.5rem solid var(--primary2);
    position: relative;
  }

  .wavePage::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: var(--bg-image);
    background-color: var(--complement2);
    background-position: top;
    background-repeat: no-repeat;
    background-size: 100%;
    z-index: -1;
    transition: 300ms;
    filter: var(--filter);
  }
</style>
