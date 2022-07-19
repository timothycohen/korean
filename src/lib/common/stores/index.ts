import { writable } from 'svelte/store';
export { rippleStore } from '$common/stores/ripple';

export const flagStore = (initial: boolean) => {
  const store = writable<boolean>(initial);
  return {
    ...store,
    toggle: () => store.update(f => (f = !f)),
  };
};

export const counterStore = (initial: number, jump: number) => {
  const store = writable(initial);
  return {
    ...store,
    increment: () => store.update(c => (c += jump)),
    decrement: () => store.update(c => (c -= jump)),
    reset: () => store.set(initial),
  };
};

export const flagCounterStore = (on: boolean, initial: number, jump: number) => {
  const counter = writable({ on, value: initial, jump });

  return {
    ...counter,
    increment: () => counter.update(c => ({ ...c, value: c.value + c.jump })),
    decrement: () => counter.update(c => ({ ...c, value: c.value - c.jump })),
    resetCount: () => counter.update(c => ({ ...c, value: initial })),
    toggle: () => counter.update(c => ({ ...c, on: !c.on })),
  };
};

export const toggleStore = <T>(one: T, two: T) => {
  const store = writable<T>(one);
  return {
    ...store,
    toggle: () => store.update(d => (d === one ? two : one)),
  };
};

export const debounceStore = <T>(duration: number) => {
  const { subscribe, set } = writable<T | null>(null);

  let timer: ReturnType<typeof setTimeout>;

  const trigger = (val: T) => {
    clearInterval(timer);
    set(val);
    setTimeout(() => {
      set(null);
    }, duration);
  };
  return {
    subscribe,
    trigger,
  };
};
