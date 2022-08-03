<script lang="ts">
  import { onDestroy } from 'svelte';

  let numbers = ['하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉'];
  let count = 1;
  let direction = 1;

  let interval = setInterval(() => {
    if (count === 1) direction = 1;
    else if (count === 9) direction = -1;
    count += direction;
  }, 1000);

  onDestroy(() => clearInterval(interval));

  const calcAnimation = () => {
    let scale = 25;
    const calcStyle = (s: number, e: number) => `--startY: ${s * scale}%; --endY: ${e * scale}%;`;
    if (direction < 0 && count === 1) return calcStyle(-1, -1);
    if (direction < 0) return calcStyle(-1, 1);
    if (direction > 0 && count === 9) return calcStyle(1, 1);
    return calcStyle(1, -1);
  };
</script>

<div class="counter">
  {#key count}
    <div class="counter-display fade" style={calcAnimation()}>
      <span class="ko">{numbers[count - 1]}</span>
      <span class="en">{count}</span>
    </div>
  {/key}
  <span class="spinner" />
</div>

<style>
  .counter {
    position: relative;
    height: 100%;
    width: 100%;
    color: var(--primary2);
  }
  .counter-display {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: space-around;
    padding: 10%;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
  }
  .ko {
    font-family: 'GowunDodum';
    font-weight: 400;
    font-size: clamp(1.75rem, min(7vw, 7vh), 6rem);
  }
  .en {
    font-family: 'BioRhyme';
    font-weight: 500;
    font-size: clamp(1.3rem, min(5vw, 5vh), 5rem);
  }

  .fade {
    animation-duration: 1000ms;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
    transform-origin: center center;
    animation-fill-mode: forwards;
    animation-name: fade;
  }
  @keyframes fade {
    0% {
      opacity: 0.01;
      transform: translateY(var(--startY)) scale(0.75);
    }
    25%,
    75% {
      opacity: 1;
      transform: translateY(0px) scale(1);
    }
    100% {
      opacity: 0.01;
      transform: translateY(var(--endY)) scale(0.75);
    }
  }

  .spinner {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0%;
    border-radius: 50%;
    border-top: 2px solid pink;
    box-shadow: inset 0 0 10px pink;
    animation: startup 1s linear;
    animation: spin 16s infinite linear 1s;
    opacity: 0.2;
  }
  @keyframes startup {
    0% {
      opacity: 0.01;
    }
    100% {
      opacity: 0.1;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      opacity: 0.1;
    }
    50% {
      transform: rotate(360deg);
      opacity: 0.75;
    }
    100% {
      transform: rotate(720deg);
      opacity: 0.1;
    }
  }
</style>
