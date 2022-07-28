import { derived, writable } from 'svelte/store';
import { flagStore, drawerStore, debounceStore } from '$common/stores';
import { HangulNumber, type HangulNumberOptions } from '$number/logic';

export const showParsedInput = flagStore(false);
export const showGoalAnswer = flagStore(false);
export const drawer = drawerStore('#focus-trap-open', '#focus-trap-close');
export const userInput = writable('');
export const previousInput = writable('');
export const hint = debounceStore(1000);

export const direction = (() => {
  const store = writable<'userHanGoalNum' | 'userNumGoalHan'>('userNumGoalHan');

  const toggle = () =>
    store.update(s => {
      s = s === 'userHanGoalNum' ? 'userNumGoalHan' : 'userHanGoalNum';
      userInput.set('');
      previousInput.set('');
      return s;
    });

  return {
    ...store,
    toggle,
  };
})();

export const goal = (() => {
  const num = HangulNumber.create('sino', 'cardinal').setRandom();
  num.range = [0, 7];
  const numStore = writable(num);

  const next = () => numStore.update(n => n.setRandom());

  const updateOptions = (options: HangulNumberOptions) => {
    numStore.set(HangulNumber.create(options.type, options.option).setRandom());
  };

  return {
    ...numStore,
    next,
    updateOptions,
  };
})();

export const parsedInput = derived([userInput, goal, direction], ([$userInput, $goal, $direction]) => {
  if ($direction === 'userHanGoalNum') return '';

  const cleanedInput = $userInput.replaceAll('.', '').replaceAll(',', '');
  if (cleanedInput.length === 0) return '...';

  // when the settings change, the input reset to '' will not be triggered before this hook
  // therefore, try catch for out of range numbers
  try {
    return $goal.fromNumber(Number.parseInt(cleanedInput)).hangul;
  } catch (e) {
    console.error(e);
    return '…';
  }
});
