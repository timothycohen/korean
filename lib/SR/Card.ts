import SR from './SR';
import SRSettings from './SRSettings';
import { SpacedRepetition } from '@prisma/client';

export default class Card<T> {
  data: T;
  sr: SR;

  constructor({
    data,
    restore,
    settings,
  }: {
    data: T;
    restore?: SpacedRepetition;
    settings?: Partial<SRSettings>;
  }) {
    this.data = data;
    this.sr = new SR({ restore, settings });
  }

  resetProgress({ settings }: { settings?: Partial<SRSettings> }): void {
    this.sr = new SR({ settings });
  }
}
