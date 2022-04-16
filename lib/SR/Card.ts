import SR from './SR';
import SRSettings from './SRSettings';

export default class Card<T> {
  data: T;
  sr: SR;
  constructor(data: T, settings?: Partial<SRSettings>) {
    this.data = data;
    this.sr = new SR(settings);
  }

  resetProgress(): void {
    this.sr = new SR();
  }
}
