import { HanNumber, NativeNumberOption, HangulNumberObj } from './HanNumber';
import { getNumAtPos, getRanInt } from './utils';

export class NativeNumber extends HanNumber {
  number: number;
  hangul: string;

  constructor(public option: NativeNumberOption) {
    super();
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

  // order of magnitude, [0, 99)
  private absMin = 0;
  private absMax = 2;

  fromNumber = (number: number): HangulNumberObj => {
    if (number > 10 ** this.absMax - 1 || number < 10 ** this.absMin - 1)
      throw new Error(`Number is not within orders of magnitude
        min OOM: ${this.absMin}
        max OOM: ${this.absMax}`);

    const onesDig = getNumAtPos(number, 0);
    const tensDig = getNumAtPos(number, 1);
    let hangul = '';

    // counters and repetition ordinals use the modified native numbers
    const type = this.option === 'counter' || this.option === 'repetition' ? 'nativeModified' : 'native';

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
    const randomNum = getRanInt(10 ** this.absMin - 1, 10 ** this.absMax - 1);
    return this.fromNumber(randomNum);
  };

  isValid(str: string): boolean {
    return (
      // no leading zeros
      !/^0.+/.test(str) &&
      // spaces only before/after number (not between)
      /^\s*\d+\s*$/.test(str) &&
      // between min and max
      Number.parseInt(str, 10) >= 10 ** this.absMin - 1 &&
      Number.parseInt(str, 10) <= 10 ** this.absMax - 1
    );
  }
}
