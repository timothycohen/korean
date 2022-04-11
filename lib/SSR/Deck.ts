import Card from './Card';
import DeckSettings from './DeckSettings';

// todo sort by .ssr.due
export default class Deck<T> {
  cards: Card<T>[];
  settings: DeckSettings;
  constructor(cards?: Card<T>[], settings?: Partial<DeckSettings>) {
    this.cards = cards ?? [];
    this.settings = new DeckSettings(settings);
  }
  getNextDue() {
    throw new Error('not implemented');
  }
}
