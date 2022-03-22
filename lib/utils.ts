export const getRanInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min;

// get a random integer with equal distribution among specified orders of magnitude
// 0,0 --> 0; 1,1 --> 0-9; 2 --> 10-99; 0,2 --> 0-99;
// the problem with regular random number generation is that there is 10x as many 10^3 digits as 10^2 digits, etc.
// so the odds of getting order of magnitude 1 (10 digits) is very small compared to the order of magnitude 15
// conversely, this approach will show '0' as much as digits 1-9 combined
// for native 0-99 numbers use the pure random integer approach. for sino, which are very large, use the OOM distribution
export const getRanIntByOOM = (OOM1: number, OOM2: number): number => {
  const [minOOM, maxOOM] = [Math.min(OOM1, OOM2), Math.max(OOM1, OOM2)];
  const OOM = getRanInt(minOOM, maxOOM + 1);

  let answer = 0;
  for (let i = 0; i < OOM; i++) {
    if (i === OOM - 1 && OOM !== 1) answer += getRanInt(1, 10) * 10 ** i;
    else answer += getRanInt(0, 10) * 10 ** i;
  }
  return answer;
};

export const getRandomInteger = (num1: number, num2: number): number => {
  const [min, max] = num1 < num2 ? [num1, num2] : [num2, num1];
  const order1 = min.toString().length;
  const order2 = max.toString().length;
  const randomOrder = getRanInt(order1, order2 + 1);
  let answer = 0;
  for (let i = 0; i < randomOrder; i++) {
    const dig = i === randomOrder - 1 ? getRanInt(0, +max.toString()[0] + 1) : getRanInt(0, 10);
    answer += dig * 10 ** i;
  }
  console.log('randomInt', answer);
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

export const camelToHuman = (str: string) =>
  str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

export const format = (num: number): string => new Intl.NumberFormat().format(num);
