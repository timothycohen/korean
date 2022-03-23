import { HangulNumber } from './HangulNumber';

describe('sinoCardinal/Counter fromNumber', () => {
  const sinoCardinal = HangulNumber.createSino('cardinal');
  const sinoCounter = HangulNumber.createSino('counter');
  it('returns the expected value', () => {
    expect(sinoCardinal.fromNumber(123456789).hangul).toBe('일억 이천삼백사십오만 육천칠백팔십구');
    expect(sinoCardinal.fromNumber(123456789).number).toBe(123456789);

    expect(sinoCardinal.fromNumber(123).hangul).toBe('백이십삼');
    expect(sinoCardinal.fromNumber(123).number).toBe(123);

    expect(sinoCardinal.fromNumber(456).hangul).toBe('사백오십육');
    expect(sinoCounter.fromNumber(456).number).toBe(456);

    expect(sinoCardinal.fromNumber(789).hangul).toBe('칠백팔십구');
    expect(sinoCardinal.fromNumber(789).number).toBe(789);

    expect(sinoCardinal.fromNumber(4321).hangul).toBe('사천삼백이십일');
    expect(sinoCardinal.fromNumber(4321).number).toBe(4321);

    expect(sinoCounter.fromNumber(56789).hangul).toBe('오만 육천칠백팔십구');
    expect(sinoCardinal.fromNumber(56789).number).toBe(56789);
  });

  it('handles 0', () => {
    const num = 0;
    const expectedSino = '영';
    expect(sinoCardinal.fromNumber(num).hangul).toBe(expectedSino);
    expect(sinoCardinal.fromNumber(num).number).toBe(num);
  });

  it('does not show 0 if the number simply ends in 0', () => {
    expect(sinoCounter.fromNumber(10).hangul).toBe('십');
    expect(sinoCardinal.fromNumber(10).number).toBe(10);
  });

  it('does not show any unit for the ones place', () => {
    expect(sinoCounter.fromNumber(253).hangul).toBe('이백오십삼');
    expect(sinoCardinal.fromNumber(253).number).toBe(253);
  });

  it('throws errors for numbers outside of [0, 10^15]', () => {
    const problem = 10 ** 15;
    const smallProblem = -5;
    const bigProblem = 10 ** 15 + 20;
    const okay = 10 ** 15 - 1;

    expect(() => sinoCardinal.fromNumber(problem)).toThrowError();
    expect(() => sinoCardinal.fromNumber(smallProblem)).toThrowError();
    expect(() => sinoCardinal.fromNumber(bigProblem)).toThrowError();
    expect(sinoCardinal.fromNumber(okay).number).toBe(999_9999_9999_9999);
    expect(sinoCounter.fromNumber(okay).hangul).toBe(
      '구백구십구조 구천구백구십구억 구천구백구십구만 구천구백구십구'
    );
  });

  it('does not show any unit if any units place digit is 1', () => {
    expect(sinoCardinal.fromNumber(111_1111_1111_1111).hangul).toBe(
      '백십일조 천백십일억 천백십일만 천백십일'
    );
  });

  it('skips unused units', () => {
    expect(sinoCardinal.fromNumber(1_0111_1011_1101).hangul).toBe('일조 백십일억 천십일만 천백일');
    expect(sinoCardinal.fromNumber(1_0000_0000_0001).hangul).toBe('일조 일');
    expect(sinoCounter.fromNumber(1_0000_0100_0001).hangul).toBe('일조 백만 일');
    expect(sinoCardinal.fromNumber(31_0000_0000_0001).hangul).toBe('삼십일조 일');
    expect(sinoCardinal.fromNumber(1_0000_0001).hangul).toBe('일억 일');
    expect(sinoCounter.fromNumber(31_0000_0001).hangul).toBe('삼십일억 일');
    expect(sinoCardinal.fromNumber(1_0001).hangul).toBe('만 일');
    expect(sinoCardinal.fromNumber(31_0001).hangul).toBe('삼십일만 일');
  });
});

describe('sino getRandom', () => {
  it('generates a cardinal number that can be parsed', () => {
    const sinoCardinal = HangulNumber.createSino('cardinal');
    const randomCardinal = sinoCardinal.getRandom();
    const parsedCardinal = sinoCardinal.fromNumber(randomCardinal.number);
    expect(randomCardinal).toStrictEqual(parsedCardinal);
  });

  it('generates a counter number that can be parsed', () => {
    const sinoCounter = HangulNumber.createSino('counter');
    const randomCounter = sinoCounter.getRandom();
    const parsedCounter = sinoCounter.fromNumber(randomCounter.number);
    expect(randomCounter).toStrictEqual(parsedCounter);
  });
});

describe('sino numArr', () => {
  test('numArr', () => {
    const sinoCardinal = HangulNumber.createSino('cardinal');
    const sinoCounter = HangulNumber.createSino('counter');
    const expected = [
      {
        hangul: '영',
        number: 0,
      },
      {
        hangul: '일',
        number: 1,
      },
      {
        hangul: '이',
        number: 2,
      },
      {
        hangul: '십칠',
        number: 17,
      },
      {
        hangul: '삼십육',
        number: 36,
      },
      {
        hangul: '천오십오',
        number: 1055,
      },
      {
        hangul: '이만 삼천사백사십삼',
        number: 23443,
      },
      {
        hangul: '삼백사십이만 팔천삼백이십사',
        number: 3428324,
      },
    ];
    expect(sinoCardinal.fromNumArr([0, 1, 2, 17, 36, 1055, 23443, 3428324])).toStrictEqual(expected);
    expect(sinoCounter.fromNumArr([0, 1, 2, 17, 36, 1055, 23443, 3428324])).toStrictEqual(expected);
  });
});

describe('isValid', () => {
  test('no leading zeros', () => {
    const sinoCardinal = HangulNumber.createSino('cardinal');
    sinoCardinal.range = [4, 12];
    expect(sinoCardinal.isValid('03')).toBe(false);
  });

  test('no spaces between numbers', () => {
    const sinoCardinal = HangulNumber.createSino('cardinal');
    sinoCardinal.range = [4, 8];
    expect(sinoCardinal.isValid('3 8')).toBe(false);
    expect(sinoCardinal.isValid(' 38')).toBe(true);
    expect(sinoCardinal.isValid('38 ')).toBe(true);
  });

  test('possible allows any number in lower order of magnitudes', () => {
    const sinoCardinal = HangulNumber.createSino('cardinal');
    sinoCardinal.range = [4, 8];
    expect(sinoCardinal.isValid('0')).toBe(true);
    expect(sinoCardinal.isValid('10000')).toBe(true);
    expect(sinoCardinal.isValid('100')).toBe(true);
  });

  test('possible does not allow any number greater than the max', () => {
    const sinoCardinal = HangulNumber.createSino('cardinal');
    sinoCardinal.range = [4, 8];
    expect(sinoCardinal.isValid('65457843')).toBe(true);
    expect(sinoCardinal.isValid('99999999')).toBe(true);
    expect(sinoCardinal.isValid('100000000')).toBe(false);
  });
});

test('abs allows only numbers between absMin/absMax', () => {
  const sinoCardinal = HangulNumber.createSino('cardinal');
  sinoCardinal.range = [3, 5];
  expect(sinoCardinal.isValid('100', 'abs')).toBe(true);
  expect(sinoCardinal.isValid('99999', 'abs')).toBe(true);
  expect(sinoCardinal.isValid('600', 'abs')).toBe(true);
  expect(sinoCardinal.isValid('5238', 'abs')).toBe(true);
  // expect(sinoCardinal.isValid('0', 'abs')).toBe(true);
  expect(sinoCardinal.isValid('5', 'abs')).toBe(true);
  expect(sinoCardinal.isValid('-1', 'abs')).toBe(false);
  expect(sinoCardinal.isValid('999999999999999', 'abs')).toBe(true);
  expect(sinoCardinal.isValid('1000000000000000', 'abs')).toBe(false);
});

test('local allows only numbers between min/max', () => {
  const sinoCardinal = HangulNumber.createSino('cardinal');
  sinoCardinal.range = [3, 5];
  expect(sinoCardinal.isValid('100', 'local')).toBe(true);
  expect(sinoCardinal.isValid('99999', 'local')).toBe(true);
  expect(sinoCardinal.isValid('600', 'local')).toBe(true);
  expect(sinoCardinal.isValid('5238', 'local')).toBe(true);
  expect(sinoCardinal.isValid('-1', 'local')).toBe(false);
  expect(sinoCardinal.isValid('0', 'local')).toBe(false);
  expect(sinoCardinal.isValid('99', 'local')).toBe(false);
  expect(sinoCardinal.isValid('12345', 'local')).toBe(true);
  expect(sinoCardinal.isValid('123456', 'local')).toBe(false);
  expect(sinoCardinal.isValid('100_0000_0000_0000', 'local')).toBe(false);
});
