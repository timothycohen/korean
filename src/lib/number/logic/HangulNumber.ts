import { type HangulNumberOptions, HanNumber, type NativeNumberOption, type SinoNumberOption } from './HanNumber';
import { NativeNumber } from './NativeNumber';
import { SinoNumber } from './SinoNumber';

export abstract class HangulNumber extends HanNumber {
  static createSino(option: SinoNumberOption) {
    return new SinoNumber(option);
  }
  static createNative(option: NativeNumberOption) {
    return new NativeNumber(option);
  }
  static create<T extends HangulNumberOptions>(type: T['type'], option: T['option']): NativeNumber | SinoNumber {
    if (type === 'native') return new NativeNumber(option);
    if (type === 'sino') return new SinoNumber(option as SinoNumberOption);
    throw new Error(`unexpected type was not 'native' or 'sino'`);
  }
}
