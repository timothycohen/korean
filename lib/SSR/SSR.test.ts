import SSR from './SSR';

describe('SSR', (): void => {
  describe('create', (): void => {
    it('should create a card', (): void => {
      const card = new SSR();
      expect(card).toBeDefined();
    });
    it('should create a card with optional settings', (): void => {
      const card = new SSR({
        maximumInterval: 999,
      });
      expect(card).toBeDefined();
    });
    it('should originally be in the learning state', (): void => {
      const card = new SSR();
      expect(card.status).toBe('learning');
    });
    it('should have a creation date', () => {
      const card = new SSR();
      expect(card.createdAt.getMinutes()).toEqual(new Date().getMinutes());
    });
  });

  describe('mark', (): void => {
    it('should update the stepsIndex when grading', (): void => {
      const card = new SSR();
      card.mark('good');
      expect(card.stepsIndex).toBe(1);
    });
    it('should immediately graduate a new card when marking easy', (): void => {
      const card = new SSR();
      expect(card.status).toBe('learning');
      card.mark('easy');
      expect(card.status).toBe('reviewing');
    });
    it('should not change the easeFactor of a learning card', (): void => {
      const card = new SSR();
      const OGEase = card.easeFactor;
      card.mark('again');
      expect(card.easeFactor).toBe(OGEase);
      card.mark('good');
      expect(card.easeFactor).toBe(OGEase);
      card.mark('easy');
      expect(card.easeFactor).toBe(OGEase);
    });
    it('should only change the easeFactor of a reviewing card when marking easy', (): void => {
      const card = new SSR();
      card.mark('easy');
      expect(card.status).toBe('reviewing');
      const OGEase = card.easeFactor;
      card.mark('easy');
      expect(card.easeFactor).toBeGreaterThan(OGEase);

      const card2 = new SSR();
      card2.mark('easy');
      const OGEase2 = card2.easeFactor;
      card2.mark('again');
      expect(card2.easeFactor).toBe(OGEase2);

      const card3 = new SSR();
      card3.mark('easy');
      const OGEase3 = card3.easeFactor;
      card3.mark('good');
      expect(card3.easeFactor).toBe(OGEase3);
    });

    it('should only change the easeFactor of a relearning card when marking again', (): void => {
      const card = new SSR();
      card.mark('easy');
      card.mark('easy');
      card.mark('easy');
      card.mark('again');
      expect(card.status).toBe('relearning');
      const OGEase = card.easeFactor;
      card.mark('again');
      expect(card.easeFactor).toBeLessThan(OGEase);

      const card2 = new SSR();
      card2.mark('easy');
      card2.mark('easy');
      card2.mark('easy');
      card2.mark('again');
      const OGEase2 = card2.easeFactor;
      card2.mark('good');
      expect(card2.easeFactor).toBe(OGEase2);
    });
    it('should update history on each action', (): void => {
      const card = new SSR();
      expect(card.markHistory.length).toBe(0);
      card.mark('good');
      expect(card.markHistory.length).toBe(1);
      expect(card.markHistory[0].grade).toBe('good');
      expect(card.markHistory[0].prevStatus).toBe('learning');
      expect(card.markHistory[0].updatedStatus).toBe('learning');
    });
  });
  describe('immutability', (): void => {
    it('should not allow modification of the history', (): void => {
      const card = new SSR();
      const OGHistory = card.markHistory;
      expect(OGHistory.length).toBe(0);
      card.mark('good');
      expect(OGHistory.length).toBe(0);
      expect(card.markHistory.length).toBe(1);
      expect(card.markHistory[0].grade).toBe('good');
      // ts catches because ReadonlyArray
      // card.markHistory[0] = {
      //   date: new Date(),
      //   grade: 'again',
      //   prevStatus: 'learning',
      //   updatedStatus: 'learning',
      // };
      // ts catches because readonly
      // card.markHistory = [
      //   {
      //     date: new Date(),
      //     grade: 'again',
      //     prevStatus: 'learning',
      //     updatedStatus: 'learning',
      //   },
      // ];
      // card.markHistory[0].grade = 'again'; // this throws a TypeError
      expect(card.markHistory[0].grade).toBe('good');
    });
  });
});
