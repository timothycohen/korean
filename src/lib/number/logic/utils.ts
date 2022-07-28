export const getRanInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min;

// the problem with regular random number generation is that there are 10x as many 10^3 digits as 10^2 digits, etc.
// so the odds of getting order of magnitude 1 (10 digits) is very small compared to the order of magnitude 15
// conversely, separating by OOM will show '0' as much as digits 1-9 combined
// for numbers to 0-99 use the pure random integer approach. for larger numbers use the OOM distribution
export const getRanIntByOOM = (OOM1: number, OOM2: number): number => {
  const [minOOM, maxOOM] = [Math.min(OOM1, OOM2), Math.max(OOM1, OOM2)];

  if (maxOOM === 1 && minOOM === 0) return getRanInt(0, 10);
  if (maxOOM === 1) return getRanInt(1, 10);
  if (maxOOM === 2 && minOOM === 0) return getRanInt(0, 99);
  if (maxOOM === 2 && minOOM === 1) return getRanInt(1, 99);
  if (maxOOM === 2) return getRanInt(10, 99);

  const OOM = getRanInt(minOOM, maxOOM + 1);

  let answer = 0;
  for (let i = 0; i < OOM; i++) {
    // the most significant digit should not be 0
    if (i === OOM - 1) answer += getRanInt(1, 10) * 10 ** i;
    else answer += getRanInt(0, 10) * 10 ** i;
  }
  return answer;
};

export const getNumAtPos = (num: number, pos: number): number => {
  const arr = num.toString().split('');
  if (pos > arr.length - 1) return 0;
  const digit = arr[arr.length - 1 - pos];
  const int = parseInt(digit, 10);
  if (!Number.isInteger(int)) {
    throw new Error(`received ${num} but only positive numbers are supported`);
  }
  return int;
};

export const format = (num: number): string => new Intl.NumberFormat().format(num);

// this may not unformat Chinese / Arabic options on the Intl formatter
export const unFormat = (str: string): string => str.replaceAll(/\s/g, '').replaceAll('.', '').replaceAll(',', '');

export const camelToHuman = (str: string) => str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
