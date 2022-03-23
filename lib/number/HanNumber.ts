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
import { format } from './utils';

export type NativeNumberOption = 'cardinal' | 'counter' | 'sequence' | 'repetition';

export type SinoNumberOption = 'cardinal' | 'counter';

export type HangulNumberObj = {
  number: number;
  hangul: string;
};

export type HangulNumberOptions =
  | {
      type: 'sino';
      option: SinoNumberOption;
    }
  | {
      type: 'native';
      option: NativeNumberOption;
    };

export abstract class HanNumber {
  abstract type: 'native' | 'sino';
  abstract number: number;
  abstract hangul: string;
  abstract absMin: number;
  protected abstract _min: number;
  abstract absMax: number;
  protected abstract _max: number;
  abstract option: string;
  abstract fromNumber: (number: number) => HangulNumberObj;
  abstract getRandom: () => HangulNumberObj;
  abstract isValid: (str: string, option?: 'possible' | 'abs' | 'local') => boolean;

  setRandom = (): this => {
    const obj = this.getRandom();
    this.number = obj.number;
    this.hangul = obj.hangul;
    return this;
  };

  setFromNumber = (number: number): this => {
    const obj = this.fromNumber(number);
    this.hangul = obj.hangul;
    this.number = obj.number;
    return this;
  };

  get formattedNumber(): string {
    return format(this.number);
  }

  // making _min OOM and min the int in Sino would match NativeNumber API,
  // but setting Sino min/max by OOM is likely more convenient
  get min(): number {
    return this._min;
  }

  get max(): number {
    return this._max;
  }

  set min(num: number) {
    if (num < this.absMin) throw new Error(`${num} is smaller than the absMin of ${this.absMin}`);
    if (num > this._max) throw new Error(`${num} is larger than the current max of ${this._max}`);
    this._min = num;
    if (this.number < this._min) this.setRandom();
  }

  set max(num: number) {
    if (num > this.absMax) throw new Error(`${num} is larger than the absMax of ${this.absMax}`);
    if (num < this._min) throw new Error(`${num} is smaller than the current min of ${this._min}`);
    this._max = num;
    if (this.number > this._max) this.setRandom();
  }

  get range(): [number, number] {
    return [this.min, this.max];
  }

  set range(numArr: [number, number]) {
    if (numArr.length !== 2) throw new Error(`Proper argument: [min, max]`);
    const [min, max] = [Math.min(numArr[0], numArr[1]), Math.max(numArr[0], numArr[1])];
    this.min = min;
    this.max = max;
  }

  abstract formattedRange: [string, string];
}
