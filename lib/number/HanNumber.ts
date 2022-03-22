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
  abstract number: number;
  abstract hangul: string;
  abstract fromNumber: (number: number) => HangulNumberObj;
  abstract getRandom: () => HangulNumberObj;
  // abstract isValid: (str: string) => boolean;

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
}
