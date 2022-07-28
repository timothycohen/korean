import { writable, type Writable } from 'svelte/store';
import { flagStore, flagCounterStore, toggleStore } from '$common/stores';
import type { ColorMap } from '$backend/color';

export const showKey = flagStore(false);
export const showAnswer = flagStore(false);
export const streakCounter = flagCounterStore(false, 0, 1);
export const direction = toggleStore<'colorToHangul' | 'hangulToColor'>('hangulToColor', 'colorToHangul');
export const allColors = writable<ColorMap[]>([]);

type Colors = { color: ColorMap; nextColor: ColorMap };

export const colors = (() => {
  const colorStore = writable() as Writable<Colors> & { init: () => void; next: () => void };
  let colors = [] as ColorMap[];
  let index = 0;
  const max = 100;
  // give a buffer of 5 for reaaaallllllyyyy slow internet connections
  const timeToGetMore = 95;

  // the store is initialized with 100 colors received from the /colors page endpoint
  const init = (colorMapArray: ColorMap[]) => {
    colors = colorMapArray;
    colorStore.set({ color: colors[index], nextColor: colors[index + 1] });
  };

  const next = async () => {
    index++;

    if (index === timeToGetMore) {
      const leftOverColors = colors.slice(timeToGetMore + 1, max);
      const res = await fetch(`${import.meta.env.VITE_APP_URL}/api/colors?count=${max - leftOverColors.length}`);
      const newColors = (await res.json()) as ColorMap[];
      colors = leftOverColors.concat(newColors);
      index = 0;
    }
    colorStore.set({ color: colors[index], nextColor: colors[index + 1] });
  };

  return { ...colorStore, init, next };
})();
