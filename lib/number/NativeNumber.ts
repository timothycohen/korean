import { HanNumber, NativeNumberOption, HangulNumberObj } from './HanNumber';
import { getNumAtPos, getRanInt } from './utils';

export class NativeNumber extends HanNumber {
  number: number;
  hangul: string;
  private absMin: number;
  private absMax: number;

  constructor(public option: NativeNumberOption) {
    super();
    this.absMin = option === 'sequence' || option === 'repetition' ? 1 : 0;
    this.absMax = 99;
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
        min: ${this.absMin}
        max: ${this.absMax}`);

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
    const randomNum = getRanInt(this.absMin, this.absMax);
    return this.fromNumber(randomNum);
  };

  isValid(str: string): boolean {
    return (
      // no leading zeros
      !/^0.+/.test(str) &&
      // spaces only before/after number (not between)
      /^\s*\d+\s*$/.test(str) &&
      // between min and max
      Number.parseInt(str, 10) >= this.absMin &&
      Number.parseInt(str, 10) <= this.absMax
    );
  }

  printAll(): string[] {
    return Array.from(Array(this.absMax - this.absMin + 1).keys())
      .map(x => (x += this.absMin))
      .map(n => this.fromNumber(n).hangul);
  }
}
