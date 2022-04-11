import SSR from './SSR';
import SSRSettings from './SSRSettings';

export default class Card<T> {
  data: T;
  ssr: SSR;
  constructor(data: T, settings?: Partial<SSRSettings>) {
    this.data = data;
    this.ssr = new SSR(settings);
  }

  resetProgress(): void {
    this.ssr = new SSR();
  }
}
