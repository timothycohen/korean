import Card from './Card';
import { HangulNumber } from '../number/HangulNumber';

describe('Card', (): void => {
  it('should take any data', (): void => {
    const num = HangulNumber.create('native', 'counter');
    const card = new Card(num);
    expect(card.data).toBe(num);
  });

  it('should have a default SSR', (): void => {
    const num = HangulNumber.create('native', 'counter');
    const card = new Card(num);
    card.ssr.mark('good');
    expect(card.ssr.markHistory[0].grade).toBe('good');
  });
});
