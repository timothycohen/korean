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

export const toggleStore = <T>(one: T, two: T, toggleCB?: () => void) => {
  const store = writable<T>(one);

  const toggle = () => {
    store.update(d => {
      d = d === one ? two : one;
      if (toggleCB) toggleCB();
      return d;
    });
  };
  return {
    ...store,
    toggle,
  };
};

export const tempStore = <T>(duration: number, storeCallback?: () => void) => {
  const { subscribe, set } = writable<T | null>(null);

  let timer: ReturnType<typeof setTimeout>;

  const trigger = (val: T, cb?: () => void) => {
    clearInterval(timer);
    set(val);
    setTimeout(() => {
      set(null);
      if (storeCallback) storeCallback();
      if (cb) cb();
    }, duration);
  };
  return {
    subscribe,
    trigger,
  };
};

export const drawerStore = (focusableOnOpen?: string, focusableOnClose?: string) => {
  const store = writable<boolean>(false);
  const open = () => {
    store.set(true);
    setTimeout(() => {
      if (focusableOnOpen) {
        const focusTrap = document.querySelector(focusableOnOpen) as HTMLInputElement | undefined;
        focusTrap?.focus();
      }
    }, 0);
    return true;
  };

  const close = () => {
    store.set(false);
    if (focusableOnClose) {
      const focusTrap = document.querySelector(focusableOnClose) as HTMLInputElement | undefined;
      focusTrap?.focus();
    }
    return false;
  };

  const toggle = () => {
    store.update(s => {
      return s ? close() : open();
    });
  };

  return {
    ...store,
    open,
    close,
    toggle,
  };
};
