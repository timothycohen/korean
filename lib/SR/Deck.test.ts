import Deck from './Deck';
import Card from './Card';
import { HangulNumber } from '../number/HangulNumber';

describe('Deck', (): void => {
  it('should have a collection of cards', (): void => {
    const card1 = new Card(HangulNumber.create('native', 'counter'));
    const card2 = new Card(HangulNumber.create('native', 'counter'));
    const card3 = new Card(HangulNumber.create('native', 'counter'));
    const deck = new Deck([card1, card2, card3]);
    expect(deck.cards).toEqual([card1, card2, card3]);
  });
});
