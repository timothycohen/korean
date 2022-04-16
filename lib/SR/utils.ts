export const daysToMinutes = (days: number): number => days * 24 * 60;

// the fudge factor is used to give 5% wiggle room to the card due date, so that the cards don't always show in the same order
export const getFudge = (): number => 0.975 + 0.05 * Math.random();

export const roundToTwo = (num: number): number => +`${Math.round(+`${num.toString()}e+2`)}e-2`;

export const addMinutes = (minutesToAdd: number): Date => {
  const d = new Date();
  d.setMinutes(d.getMinutes() + minutesToAdd);
  return d;
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
  if (max !== null && min !== null && max < min) throw new Error(`max ${max} cannot be smaller than min ${min}`);
  let mn = -Infinity;
  let mx = Infinity;
  if (min !== null) mn = min;
  if (max !== null) mx = max;
  return Math.min(Math.max(num, mn), mx);
};
