import { HanNumber, SinoNumberOption, HangulNumberObj } from './HanNumber';
import { format, getNumAtPos, getRanIntByOOM } from './utils';

export class SinoNumber extends HanNumber {
  readonly number: number;
  readonly hangul: string;
  readonly absMin: number;
  protected _min: number;
  readonly absMax: number;
  protected _max: number;
  readonly option: SinoNumberOption;

  constructor(option: SinoNumberOption) {
    super();
    this.option = option;
    // sino numbers increment units by 10^4 and not 10^3 like the West
    // therefore the highest number with 조 is 10^12 * 10^4 - 1 = (10,000 trillion - 1)
    // 10 ^ 16 - 1 > Number.MAX_SAFE_INTEGER (9007_1992_5474_0991) and would require BigInt so limit to 10^15 - 1
    this.absMin = 0;
    this.absMax = 15;
    this._min = this.absMin;
    this._max = this.absMax;
    const ran = this.getRandom();
    this.hangul = ran.hangul;
    this.number = ran.number;
  }

  private static sinoMap = {
    // log base 10
    0: ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'],
    1: '십', // ten
    2: '백', // hundred
    3: '천', // thousand
    4: '만', // ten thousand
    8: '억', // hundred million
    12: '조', // trillion
  };

  fromNumber = (number: number): HangulNumberObj => {
    if (number > 10 ** this.max - 1 || number < 10 ** this.min - 1)
      throw new Error(`Number is not within orders of magnitude
        min OOM: ${format(this.min)}
        max OOM: ${format(this.max)}`);

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
          const hangulDigit = SinoNumber.sinoMap[0][digit];
          const hangulUnit = SinoNumber.sinoMap[orderOfMagnitude];

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
      const maxOOM = Object.keys(SinoNumber.sinoMap).reduce(
        (acc, curr) => Math.max(parseInt(curr), acc),
        -Infinity
      ) as keyof typeof SinoNumber.sinoMap;

      if (orderOfMagnitude > maxOOM)
        throw new Error(
          `largest unit is ${SinoNumber.sinoMap[maxOOM]} with an order of magnitude of ${maxOOM}`
        );
      return SinoNumber.sinoMap[orderOfMagnitude];
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

  getRandom = (): HangulNumberObj => {
    const randomNum = getRanIntByOOM(this.min, this.max);
    return this.fromNumber(randomNum);
  };

  isValid = (str: string): boolean => {
    // no leading zeros
    if (/^0.+/.test(str)) return false;
    // spaces only before/after number (not between)
    if (!/^\s*\d+\s*$/.test(str)) return false;
    // allow out of range numbers only until the OOM is correct
    if (str.length >= this.max.toString().length && Number.parseInt(str, 10) > 10 ** this.max - 1)
      return false;

    return true;
  };

  fromNumArr = (numArr: number[]): HangulNumberObj[] => {
    return numArr.map(this.fromNumber);
  };
}