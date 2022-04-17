import { mergeSortByDueDate, type HasDueDate } from './utils';

describe('mergeSortByDueDate', () => {
  it('should sort an array of objects by the due date', () => {
    const testData: HasDueDate<{ data: string }>[] = [
      { data: 'D', due: new Date('2019-01-01').toISOString() },
      { data: 'A', due: new Date('2017-01-01').toISOString() },
      { data: 'C', due: new Date('2018-02-02').toISOString() },
      { data: 'B', due: new Date('2018-01-01').toISOString() },
      { data: 'E', due: new Date('2020-01-01').toISOString() },
      { data: 'F', due: new Date('2020-10-05').toISOString() },
    ];
    const answer = mergeSortByDueDate(testData);
    expect(answer).toEqual([
      { data: 'A', due: new Date('2017-01-01').toISOString() },
      { data: 'B', due: new Date('2018-01-01').toISOString() },
      { data: 'C', due: new Date('2018-02-02').toISOString() },
      { data: 'D', due: new Date('2019-01-01').toISOString() },
      { data: 'E', due: new Date('2020-01-01').toISOString() },
      { data: 'F', due: new Date('2020-10-05').toISOString() },
    ]);
  });
});
