import { writable } from 'svelte/store';

type Container = {
  containerX: number;
  containerY: number;
  containerH: number;
  containerW: number;
};
type Absolute = {
  absoluteX: number;
  absoluteY: number;
};
type RippleMeasurement = Absolute & Container;
type Relative = {
  relativeX: number;
  relativeY: number;
};
type CalculatedRippleMeasurement = RippleMeasurement & Relative & { size: number };

export const rippleStore = () => {
  const { subscribe, set, update } = writable<CalculatedRippleMeasurement[]>([]);

  const clear = () => set([]);

  // calculate the ripple details based on the container size
  const calcScaleRatio = (containerWidth: number, containerHeight: number) => {
    // offset the ripple so it doesn't happen directly under the click
    const coords = { x: 50, y: 50 };
    const offsetX = Math.abs(containerWidth / 2 - coords?.x);
    const offsetY = Math.abs(containerHeight / 2 - coords?.y);
    const deltaX = containerWidth / 2 + offsetX;
    const deltaY = containerHeight / 2 + offsetY;
    const scale_ratio = Math.sqrt(Math.pow(deltaX, 2.2) + Math.pow(deltaY, 2.2));
    return scale_ratio;
  };

  const add = (ripple: RippleMeasurement) =>
    update((ripples: CalculatedRippleMeasurement[]) => {
      const newRipple = {
        ...ripple,
        relativeX: ripple.absoluteX - ripple.containerX,
        relativeY: ripple.absoluteY - ripple.containerY,
        size: calcScaleRatio(ripple.containerH, ripple.containerW),
      };
      return [...ripples, newRipple];
    });

  const addCenter = (container: Container) => {
    const { containerX, containerY, containerH, containerW } = container;
    return update((ripples: CalculatedRippleMeasurement[]) => {
      const newRipple = {
        ...container,
        absoluteX: containerH + containerY / 2,
        absoluteY: containerW + containerX / 2,
        relativeX: containerW / 2,
        relativeY: containerH / 2,
        size: calcScaleRatio(containerH, containerW),
      };
      return [...ripples, newRipple];
    });
  };

  let timer: ReturnType<typeof setTimeout>;
  const clearIn = (timeout: number) => {
    clearTimeout(timer);
    timer = setTimeout(clear, timeout);
  };

  return {
    subscribe,
    add,
    addCenter,
    clear,
    clearIn,
  };
};
