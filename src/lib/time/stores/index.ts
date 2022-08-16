import { flagStore, toggleStore, debounceStore } from '$common/stores';
import { writable, derived } from 'svelte/store';
import { HangulTime, type Hour, type Minute } from '$time/logic';

export const userInput = writable('');
export const previousInput = writable('');
export const hint = debounceStore(1000);
export const showParsedInput = flagStore(true);
export const showGoalAnswer = flagStore(false);

export const direction = toggleStore('seeHHMMTypeKo', 'seeKoTypeHHMM', () => {
  userInput.set('');
  previousInput.set('');
});

export const goal = (() => {
  const timeStore = writable(new HangulTime());
  const next = () => timeStore.set(new HangulTime());

  return {
    ...timeStore,
    next,
  };
})();

export const parsedInput = derived([userInput, direction], ([$userInput, $direction]) => {
  if ($direction !== 'seeKoTypeHHMM') return '';
  if ($userInput.length === 0) return '...';
  try {
    const [h, m] = $userInput.split(':').map(s => Number.parseInt(s, 10)) as [Hour, Minute];
    const time = HangulTime.toHangul(h, m ?? 0);
    return time;
  } catch (e) {
    console.error(e);
    return '…';
  }
});
