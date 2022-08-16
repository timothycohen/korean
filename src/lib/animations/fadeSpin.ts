import type { TransitionConfig } from 'svelte/transition';
import { quadInOut } from 'svelte/easing';

type FadeSpin = { opacity: number; scale: number; rotate: number };
export type fadeSpinConfig = { start: FadeSpin; end: FadeSpin; duration: number; delay: number };

export const defaultFadeSpin: fadeSpinConfig = {
  start: { opacity: 0.01, scale: 0.8, rotate: -360 },
  end: { opacity: 1, scale: 1, rotate: 0 },
  duration: 250,
  delay: 0,
};

export const fadeSpin = (_node: HTMLElement, config: fadeSpinConfig): TransitionConfig => {
  const { start, end, duration, delay } = config;

  const animation = {
    opacity: { from: start.opacity, delta: end.opacity - start.opacity },
    scale: { from: start.scale, delta: end.scale - start.scale },
    rotate: { from: start.rotate, delta: end.rotate - start.rotate },
  };
  return {
    duration,
    css: t => {
      const opacity = animation.opacity.from + animation.opacity.delta * t;
      const scale = quadInOut(animation.scale.from + animation.scale.delta * t);
      const rotate = animation.rotate.from + animation.rotate.delta * t;
      return `opacity: ${opacity}; transform: scale(${scale}) rotate(${rotate}deg);`;
    },
    delay,
  };
};
