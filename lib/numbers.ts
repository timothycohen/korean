import { getNumAtPos, getRanIntByOOM, getRanInt, format } from './utils';
/*
  Koreans have two types of numbers — native and sino — that are used in different situations and go with different counters
  Furthermore, there are cardinal numbers (that change before counters), and two types of ordinal numbers (sequence or repetition)
  The sino ordinals have their own grammar, but also use the 번째 format of native ordinals
  cardinal (total quantity): three
    native: 하나, 둘, 셋
    sino: 일, 이, 삼
  cardinal with counter: three bananas
    native: four numbers are modified: 한, 두, 세, 스무
    sino: same as cardinal
  ordinal for repetitive events: third question
    native: 첫 번째, 두 번째
    TODO: : 제 일차, 제 이차, 제 삼차 OR 만 번째
  ordinal for a sequence: third apple in the second row
    native: 첫째, 둘째, 셋째, 냇째 (sometimes also used as 두째, 세째, 네째, but I didn't implement that here)
    TODO: sino: 제일, 제이, 제삼 OR 만 번째
*/

export type HangulNumberType = 'native' | 'sino';

export type HangulNumberOptions = 'cardinal' | 'counter' | 'sequence' | 'repetition';

export type HangulNumber = {
  number: number;
  hangul: string;
};

const nativeMap: Record<'native' | 'nativeModified', Record<string, string[]>> = {
  native: {
    ones: ['영', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉'],
    tens: ['', '열', '스물', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔'],
  },
  nativeModified: {
    ones: ['영', '한', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉'],
    tens: ['', '열', '스무', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔'],
  },
};

const sinoMap = {
  // log base 10
  0: ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'],
  1: '십', // ten
  2: '백', // hundred
  3: '천', // thousand
  4: '만', // ten thousand
  8: '억', // hundred million
  12: '조', // trillion
};

const max: Record<HangulNumberType, number> = {
  // sino numbers increment units by 10^4 and not 10^3 like the West
  // therefore the highest number with 조 is 10^12 * 10^4 - 1 = (10,000 trillion - 1)
  // 10 ^ 16 - 1 > Number.MAX_SAFE_INTEGER (9007_1992_5474_0991) and would require BigInt so limit to 10^15 - 1
  native: 2,
  sino: 15,
};

const min: Record<HangulNumberType, number> = {
  native: 0,
  sino: 0,
};

const numToNative = (number: number, option: HangulNumberOptions): HangulNumber => {
  const onesDig = getNumAtPos(number, 0);
  const tensDig = getNumAtPos(number, 1);
  let hangul = '';

  // counters and repetition ordinals use the modified native numbers
  const type = option === 'counter' || option === 'repetition' ? 'nativeModified' : 'native';

  // if 0-9, return just the zeros digit
  if (!tensDig) hangul = nativeMap[type].ones[onesDig];
  // if a multiple of ten, return the tens digit only
  else if (!onesDig) hangul = nativeMap[type].tens[tensDig];
  // the tens digit isn't modified if it has a ones place digit after it
  else hangul = [nativeMap['native'].tens[tensDig], nativeMap[type].ones[onesDig]].join('');

  // add the ordinal suffix as needed
  if (option === 'repetition') hangul += ' 번째';
  if (option === 'sequence') hangul += '째';
  // take care of the special case 1
  if (hangul === '한 번째') hangul = '첫 번째';
  if (hangul === '하나째') hangul = '첫째';

  return { number, hangul };
};

const numToSino = (number: number, option: HangulNumberOptions): HangulNumber => {
  if (option !== 'cardinal' && option !== 'counter') throw new Error('ordinals not implemented');
  // Sino-Korean numbers increment units by 10,000 and not 1,000 like the West
  // therefore, parse by fours
  const divideIntoFours = (num: number): number[] => {
    let numberArray = num.toString().split('');
    // add leading zeros so the groupings are ex: [52, 3222] not [5232, 22]
    const leadingZerosToAdd = 4 - (numberArray.length % 4);
    if (leadingZerosToAdd > 0 && leadingZerosToAdd < 4) {
      numberArray = new Array(leadingZerosToAdd).fill('0').concat(numberArray);
    }

    const res = [];
    while (numberArray.length) {
      res.push(parseInt(numberArray.splice(0, 4).join('')));
    }

    return res;
  };

  const parseFour = (num: number): string => {
    let parsed = '';

    [3, 2, 1, 0]
      // log base 10 to represent digitsPlace (order of magnitude)
      .map(n => getNumAtPos(num, n))
      // map the digits place to get [thousandsDigit, hundredsDigit, tensDigit, onesDigit]
      .forEach((digit, index): void => {
        // if the digit is 0, show nothing
        if (digit === 0) return;

        const orderOfMagnitude = (3 - index) as 0 | 1 | 2 | 3;
        const hangulDigit = sinoMap[0][digit];
        const hangulUnit = sinoMap[orderOfMagnitude];

        if (orderOfMagnitude === 0) {
          // if the digit is the onesDigit, only show the digit without any digit marker. ex: '이'
          parsed += hangulDigit;
        } else if (digit === 1) {
          // if the digit is 1, just show the digit unit marker, not 1. ex: '천', not '일천'
          // 1_0000_0000_0001 should be 조 일 not 일조 일
          parsed += hangulUnit;
        } else {
          // show the number and the digit marker. ex: '이천'
          parsed += hangulDigit + hangulUnit;
        }
      });

    return parsed;
  };

  const calcUnitOfFour = (index: number): string => {
    if (index === 0) return '';

    const orderOfMagnitude = (index * 4) as 4 | 8 | 12;
    const maxOOM = Object.keys(sinoMap).reduce(
      (acc, curr) => Math.max(parseInt(curr), acc),
      -Infinity
    ) as keyof typeof sinoMap;

    if (orderOfMagnitude > maxOOM)
      throw new Error(`largest unit is ${sinoMap[maxOOM]} with an order of magnitude of ${maxOOM}`);
    return sinoMap[orderOfMagnitude];
  };

  const filterExceptions = (str: string) => {
    // take out unused four digit units "일조 억 만 일" --> "일조 일"
    if (str === '억') return '';
    if (str === '만') return '';
    // it's 일억... and 십일만... but 만 ...
    if (str === '일만') return '만';
    return str;
  };

  if (number === 1) return { number, hangul: '일' };

  const hangul = divideIntoFours(number)
    .map((four, index, arr): string => `${parseFour(four)}${calcUnitOfFour(arr.length - 1 - index)}`)
    .map(filterExceptions)
    .join(' ')
    .replace(/\s+/g, ' ');

  // handle base case
  return { number, hangul: hangul === '' ? '영' : hangul };
};

export function numToHangul(
  number: number,
  type: HangulNumberType,
  option: HangulNumberOptions = 'cardinal'
): HangulNumber {
  if (number > 10 ** max[type] - 1 || number < 10 ** min[type] - 1)
    throw new Error(
      `Number is not within orders of magnitude of ${type}
        min OOM: ${format(min[type])}
        max OOM: ${format(max[type])}`
    );
  if (type === 'native') return numToNative(number, option);
  else if (type === 'sino') return numToSino(number, option);
  throw new Error(`Type ${type} not supported`);
}

export const getRandomHangulNumber = (
  type: HangulNumberType,
  option: HangulNumberOptions = 'cardinal'
): HangulNumber => {
  const randomNum =
    type === 'native'
      ? getRanInt(10 ** min[type] - 1, 10 ** max[type] - 1)
      : getRanIntByOOM(min[type], max[type]);
  return numToHangul(randomNum, type, option);
};

export const isValidHangulNumber = (str: string, type: HangulNumberType): boolean => {
  return (
    // no leading zeros
    !/^0.+/.test(str) &&
    // spaces only before/after number (not between)
    /^\s*\d+\s*$/.test(str) &&
    // between min and max
    Number.parseInt(str, 10) >= 10 ** min[type] - 1 &&
    Number.parseInt(str, 10) <= 10 ** max[type] - 1
  );
};
