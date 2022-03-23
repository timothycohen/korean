import { HanNumber, NativeNumberOption, HangulNumberObj } from './HanNumber';
import { getNumAtPos, getRanInt } from './utils';

export class NativeNumber extends HanNumber {
  readonly type: 'native';
  readonly number: number;
  readonly hangul: string;
  readonly absMin: number;
  protected _min: number;
  readonly absMax: number;
  protected _max: number;
  readonly option: NativeNumberOption;

  constructor(option: NativeNumberOption) {
    super();
    this.type = 'native';
    this.option = option;
    this.absMin = option === 'sequence' || option === 'repetition' ? 1 : 0;
    this.absMax = 99;
    this._min = this.absMin;
    this._max = this.absMax;
    const ran = this.getRandom();
    this.hangul = ran.hangul;
    this.number = ran.number;
  }

  private static nativeMap: Record<'native' | 'nativeModified', Record<string, string[]>> = {
    native: {
      ones: ['영', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉'],
      tens: ['', '열', '스물', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔'],
    },
    nativeModified: {
      ones: ['영', '한', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉'],
      tens: ['', '열', '스무', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔'],
    },
  };

  fromNumber = (number: number): HangulNumberObj => {
    if (number > this.absMax || number < this.absMin)
      throw new Error(`Number is not within range
        absMin: ${this.absMin}
        absMax: ${this.absMax}`);

    const onesDig = getNumAtPos(number, 0);
    const tensDig = getNumAtPos(number, 1);
    let hangul = '';

    const getMap = (num: number, option: NativeNumberOption): 'native' | 'nativeModified' => {
      // cardinal uses native for all
      if (option === 'cardinal') return 'native';

      // sequence uses special for 1 and modified for 20, 11, 12, 21, 22, ..., 91, 92
      if (option === 'sequence') {
        if (num < 11) return 'native';
        if (num === 20) return 'nativeModified';
        if (num % 10 === 1) return 'nativeModified';
        if (num % 10 === 2) return 'nativeModified';
        return 'native';
      }

      // counter and repetition use modified for all
      return 'nativeModified';
    };

    const type = getMap(number, this.option);

    // if 0-9, return just the zeros digit
    if (!tensDig) hangul = NativeNumber.nativeMap[type].ones[onesDig];
    // if a multiple of ten, return the tens digit only
    else if (!onesDig) hangul = NativeNumber.nativeMap[type].tens[tensDig];
    // the tens digit isn't modified if it has a ones place digit after it
    else
      hangul = [
        NativeNumber.nativeMap['native'].tens[tensDig],
        NativeNumber.nativeMap[type].ones[onesDig],
      ].join('');

    // add the ordinal suffix as needed
    if (this.option === 'repetition') hangul += ' 번째';
    if (this.option === 'sequence') hangul += '째';
    // take care of the special case 1
    if (hangul === '한 번째') hangul = '첫 번째';
    if (hangul === '하나째') hangul = '첫째';

    return { number, hangul };
  };

  getRandom = (): HangulNumberObj => {
    const randomNum = getRanInt(this._min, this._max);
    return this.fromNumber(randomNum);
  };

  isValid = (numAsString: string, option: 'possible' | 'abs' | 'local' = 'possible'): boolean => {
    // no leading zeros
    if (/^0.+/.test(numAsString)) return false;
    // spaces only before/after number (not between)
    if (!/^\s*\d+\s*$/.test(numAsString)) return false;

    const num = Number.parseInt(numAsString, 10);

    // allow out of range numbers for all numbers below (to allow typing 6 when the range is 50-70)
    if (option === 'possible' && num > this._max) return false;
    // only allow when number is within min/max
    if (option === 'local' && (num > this._max || num < this._min)) return false;
    // only allow when number is within absMin/absMax
    if (option === 'abs' && (num > this.absMax || num < this.absMin)) return false;

    return true;
  };

  printAll(): string[] {
    return Array.from(Array(this._max - this._min + 1).keys())
      .map(x => (x += this._min))
      .map(n => this.fromNumber(n).hangul);
  }
}
