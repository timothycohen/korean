export const daysToMinutes = (days: number): number => days * 24 * 60;

// the fudge factor is used to give 5% wiggle room to the card due date, so that the cards don't always show in the same order
export const getFudge = (): number => 0.975 + 0.05 * Math.random();

export const roundToTwo = (num: number): number => +`${Math.round(+`${num.toString()}e+2`)}e-2`;

export const addMinutes = (minutesToAdd: number, startDate?: string): string => {
  const d = startDate ?? new Date().toISOString();
  const date = new Date(d);
  date.setMinutes(date.getMinutes() + minutesToAdd);
  return date.toISOString();
};

export const timeUntil = (toDate: Date): string => {
  let seconds = Math.floor((toDate.getTime() - Date.now()) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(seconds / 60 / 60);
  const days = Math.floor(seconds / 60 / 60 / 24);
  hours %= 24;
  minutes %= 60;
  seconds %= 60;
  return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
};

export const clamp = (min: number | null, num: number, max: number | null): number => {
  if (max !== null && min !== null && max < min)
    throw new Error(`max ${max} cannot be smaller than min ${min}`);
  let mn = -Infinity;
  let mx = Infinity;
  if (min !== null) mn = min;
  if (max !== null) mx = max;
  return Math.min(Math.max(num, mn), mx);
};

export type HasDueDate<T> = { due: string } & T;

export const mergeSortByDueDate = <T>(arr: HasDueDate<T>[]): HasDueDate<T>[] => {
  const mutableHelper = (arr: HasDueDate<T>[]): HasDueDate<T>[] => {
    const mergeTwoSortedArrays = (arr1: HasDueDate<T>[], arr2: HasDueDate<T>[]): HasDueDate<T>[] => {
      let smallestIndex1 = 0;
      let smallestIndex2 = 0;
      const mergedSection = new Array<HasDueDate<T>>(arr1.length + arr2.length);

      for (let i = 0; i < mergedSection.length; i++) {
        const inc1 = () => {
          mergedSection[i] = arr1[smallestIndex1];
          smallestIndex1++;
        };
        const inc2 = () => {
          mergedSection[i] = arr2[smallestIndex2];
          smallestIndex2++;
        };

        const arr1Data = arr1[smallestIndex1] as HasDueDate<T> | undefined;
        const arr2Data = arr2[smallestIndex2] as HasDueDate<T> | undefined;
        if (!arr1Data && !arr2Data) continue;
        else if (!arr1Data) {
          inc2();
        } else if (!arr2Data || new Date(arr1Data.due) < new Date(arr2Data.due)) {
          inc1();
        } else {
          inc2();
        }
      }
      return mergedSection;
    };

    // keep splitting recursively until they're at a single element
    if (arr.length === 1) return arr;
    const mid = Math.ceil(arr.length / 2);
    const arr1 = mutableHelper(arr.slice(0, mid));
    const arr2 = mutableHelper(arr.slice(mid));

    return mergeTwoSortedArrays(arr1, arr2);
  };

  const newArr = [...arr];
  return mutableHelper(newArr);
};
