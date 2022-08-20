<script lang="ts">
  export let size = 700;
  export let hour = 6;
  export let minute = 16;

  const rad = (deg: number): number => (deg * Math.PI) / 180;

  // the width starts where its center should be. push everything over by 50% width per axis
  const calcTop = (deg: number, width: number): string => `calc(50% - calc(${width / 2}% * ${Math.cos(rad(deg))}))`;
  const calcLeft = (deg: number, width: number): string => `calc(50% + calc(${width / 2}% * ${Math.sin(rad(deg))}))`;

  const getTransformX = (deg: number): number => (size / 2) * Math.cos(rad(deg));
  const getTransformY = (deg: number): number => (size / 2) * Math.sin(rad(deg));
  const calcTransform = (deg: number): string =>
    `translate(${getTransformX(deg)}px, ${getTransformY(deg)}px) rotate(${90 + deg}deg)`;

  const minHangDeg = 90 + (minute * 360) / 60;
  const hrHandDeg = 90 + (hour * 360) / 12 + ((Number.isNaN(minute) ? 0 : minute) * 360) / 12 / 60;
</script>

<div class="clock" style="height: {size}px; width: {size}px;">
  <div class="circle" />

  {#each [...Array(60)].map((_, i) => i * 6) as tick}
    {#if tick % 30 === 0}
      <div
        class="hr-mark"
        style="top: {calcTop(tick, 2)}; left: {calcLeft(tick, 2)}; transform: {calcTransform(tick)}"
      />
    {:else}
      <div
        class="min-mark"
        style="top: {calcTop(tick, 0.85)}; left: {calcLeft(tick, 0.85)}; transform: {calcTransform(tick)}"
      />
    {/if}
  {/each}

  <div
    class="hr-hand"
    style="top: {calcTop(hrHandDeg, 2.5)}; left: {calcLeft(hrHandDeg, 2.5)}; transform: {calcTransform(hrHandDeg)};"
  />
  <div
    class="min-hand"
    style="top: {calcTop(minHangDeg, 1.5)}; left: {calcLeft(minHangDeg, 1.5)}; transform: {calcTransform(minHangDeg)};"
  />
</div>

<style>
  .clock {
    position: relative;
    border-radius: 50%;
  }
  .circle {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 3px solid var(--primary2);
    z-index: 5;
  }
  .min-mark {
    position: absolute;
    width: 0.85%;
    height: 4%;
    background: linear-gradient(0deg, var(--primary2) 70%, transparent 70%);
    transform-origin: top left;
    z-index: 1;
  }
  .hr-mark {
    position: absolute;
    width: 2%;
    height: 7%;
    background: linear-gradient(0deg, var(--primary2) 80%, transparent 80%);
    transform-origin: top left;
    z-index: 2;
  }
  .min-hand {
    position: absolute;
    width: 1.5%;
    height: 100%;
    background: linear-gradient(transparent 40%, var(--primary2) 40%, var(--primary2) 90%, transparent 90%);
    transform-origin: top left;
    z-index: 3;
  }
  .hr-hand {
    position: absolute;
    width: 2.5%;
    height: 90%;
    background: linear-gradient(transparent 45%, var(--primary2) 45%, var(--primary2) 90%, transparent 90%);
    transform-origin: top left;
    z-index: 4;
  }
</style>
