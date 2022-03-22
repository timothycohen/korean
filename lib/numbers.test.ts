import { getRandomHangulNumber, numToHangul } from './numbers';

describe(`numToHangul(number, 'native', 'cardinal')`, () => {
  it('returns the expected value', () => {
    expect(numToHangul(5, 'native').hangul).toBe('다섯');
    expect(numToHangul(11, 'native').hangul).toBe('열하나');
    expect(numToHangul(37, 'native').hangul).toBe('서른일곱');
    expect(numToHangul(99, 'native').hangul).toBe('아흔아홉');
  });

  it('handles 0', () => {
    expect(numToHangul(0, 'native').hangul).toBe('영');
    expect(numToHangul(0, 'native').number).toBe(0);
  });

  it('does not show 0 if the number simply ends in 0', () => {
    expect(numToHangul(10, 'native').hangul).toBe('열');
    expect(numToHangul(10, 'native').number).toBe(10);
    expect(numToHangul(60, 'native').hangul).toBe('예순');
    expect(numToHangul(60, 'native').number).toBe(60);
  });

  it('throws errors for numbers outside [0, 99]', () => {
    const problem = 100;
    const smallProblem = -5;
    const bigProblem = 105;

    expect(() => numToHangul(problem, 'native')).toThrowError();
    expect(() => numToHangul(smallProblem, 'native')).toThrowError();
    expect(() => numToHangul(bigProblem, 'native')).toThrowError();
  });
});

describe(`numToHangul(number, 'native', 'counter') takes care of special numbers`, () => {
  it('returns the expected value', () => {
    expect(numToHangul(1, 'native', 'counter').hangul).toBe('한');
    expect(numToHangul(2, 'native', 'counter').hangul).toBe('두');
    expect(numToHangul(3, 'native', 'counter').hangul).toBe('세');
    expect(numToHangul(4, 'native', 'counter').hangul).toBe('네');
    expect(numToHangul(20, 'native', 'counter').hangul).toBe('스무');
    expect(numToHangul(21, 'native', 'counter').hangul).toBe('스물한');
    expect(numToHangul(37, 'native', 'counter').hangul).toBe('서른일곱');
  });
});

describe(`numToHangul(number, 'native', 'repetition')`, () => {
  it('returns the expected value', () => {
    expect(numToHangul(5, 'native', 'repetition').hangul).toBe('다섯 번째');
    expect(numToHangul(5, 'native', 'repetition').number).toBe(5);
  });

  it('returns the expected value', () => {
    expect(numToHangul(17, 'native', 'repetition').hangul).toBe('열일곱 번째');
    expect(numToHangul(17, 'native', 'repetition').number).toBe(17);
  });

  it('returns the expected value', () => {
    expect(numToHangul(37, 'native', 'repetition').hangul).toBe('서른일곱 번째');
    expect(numToHangul(37, 'native', 'repetition').number).toBe(37);
  });

  it('returns the expected value', () => {
    expect(numToHangul(99, 'native', 'repetition').hangul).toBe('아흔아홉 번째');
    expect(numToHangul(99, 'native', 'repetition').number).toBe(99);
  });

  it('handles 0', () => {
    expect(numToHangul(0, 'native', 'repetition').hangul).toBe('영 번째');
    expect(numToHangul(0, 'native', 'repetition').number).toBe(0);
  });

  it('handles the special 1 case', () => {
    expect(numToHangul(1, 'native', 'repetition').hangul).toBe('첫 번째');
    expect(numToHangul(1, 'native', 'repetition').number).toBe(1);
  });

  it('treats 11, 21, etc. as normal', () => {
    expect(numToHangul(11, 'native', 'repetition').hangul).toBe('열한 번째');
    expect(numToHangul(11, 'native', 'repetition').number).toBe(11);
  });

  it('does not show 0 if the number simply ends in 0', () => {
    expect(numToHangul(10, 'native', 'repetition').hangul).toBe('열 번째');
    expect(numToHangul(10, 'native', 'repetition').number).toBe(10);
    expect(numToHangul(60, 'native', 'repetition').hangul).toBe('예순 번째');
    expect(numToHangul(60, 'native', 'repetition').number).toBe(60);
  });

  it('throws errors for numbers outside [0, 99]', () => {
    const problem = 100;
    const smallProblem = -5;
    const bigProblem = 105;

    expect(() => numToHangul(problem, 'native', 'repetition')).toThrowError();
    expect(() => numToHangul(smallProblem, 'native', 'repetition')).toThrowError();
    expect(() => numToHangul(bigProblem, 'native', 'repetition')).toThrowError();
  });
});

describe(`numToHangul(number, 'native', 'sequence')`, () => {
  it('returns the expected value', () => {
    expect(numToHangul(5, 'native', 'sequence').hangul).toBe('다섯째');
    expect(numToHangul(5, 'native', 'sequence').number).toBe(5);
  });

  it('returns the expected value', () => {
    expect(numToHangul(17, 'native', 'sequence').hangul).toBe('열일곱째');
    expect(numToHangul(17, 'native', 'sequence').number).toBe(17);
  });

  it('returns the expected value', () => {
    expect(numToHangul(37, 'native', 'sequence').hangul).toBe('서른일곱째');
    expect(numToHangul(37, 'native', 'sequence').number).toBe(37);
  });

  it('returns the expected value', () => {
    expect(numToHangul(99, 'native', 'sequence').hangul).toBe('아흔아홉째');
    expect(numToHangul(99, 'native', 'sequence').number).toBe(99);
  });

  it('handles 0', () => {
    expect(numToHangul(0, 'native', 'sequence').hangul).toBe('영째');
    expect(numToHangul(0, 'native', 'sequence').number).toBe(0);
  });

  it('handles the special 1 case', () => {
    expect(numToHangul(1, 'native', 'sequence').hangul).toBe('첫째');
    expect(numToHangul(1, 'native', 'sequence').number).toBe(1);
  });

  it('uses native unmodified numbers', () => {
    expect(numToHangul(2, 'native', 'sequence').hangul).toBe('둘째');
    expect(numToHangul(2, 'native', 'sequence').number).toBe(2);
  });

  it('treats 11, 21, etc. as normal', () => {
    expect(numToHangul(11, 'native', 'sequence').hangul).toBe('열하나째');
    expect(numToHangul(11, 'native', 'sequence').number).toBe(11);
  });

  it('does not show 0 if the number simply ends in 0', () => {
    expect(numToHangul(10, 'native', 'sequence').hangul).toBe('열째');
    expect(numToHangul(10, 'native', 'sequence').number).toBe(10);
    expect(numToHangul(60, 'native', 'sequence').hangul).toBe('예순째');
    expect(numToHangul(60, 'native', 'sequence').number).toBe(60);
  });

  it('throws errors for numbers outside [0, 99]', () => {
    const problem = 100;
    const smallProblem = -5;
    const bigProblem = 105;

    expect(() => numToHangul(problem, 'native', 'sequence')).toThrowError();
    expect(() => numToHangul(smallProblem, 'native', 'sequence')).toThrowError();
    expect(() => numToHangul(bigProblem, 'native', 'sequence')).toThrowError();
  });
});

describe(`getRandomHangulNumber('native') (cardinal and counter are the same)`, () => {
  it('generates a cardinal number that can be parsed', () => {
    const randomNative = getRandomHangulNumber('native');
    const parsedNative = numToHangul(randomNative.number, 'native');
    expect(randomNative).toStrictEqual(parsedNative);
  });

  it('generates a counter number that can be parsed', () => {
    const randomNative = getRandomHangulNumber('native', 'counter');
    const parsedNative = numToHangul(randomNative.number, 'native', 'counter');
    expect(randomNative).toStrictEqual(parsedNative);
  });

  it('generates an ordinal repetition number that can be parsed', () => {
    const randomNative = getRandomHangulNumber('native', 'repetition');
    const parsedNative = numToHangul(randomNative.number, 'native', 'repetition');
    expect(randomNative).toStrictEqual(parsedNative);
  });

  it('generates an ordinal sequence number that can be parsed', () => {
    const randomNative = getRandomHangulNumber('native', 'sequence');
    const parsedNative = numToHangul(randomNative.number, 'native', 'sequence');
    expect(randomNative).toStrictEqual(parsedNative);
  });
});

describe(`numToHangul(number, 'sino', 'cardinal')`, () => {
  it('returns the expected value', () => {
    expect(numToHangul(123456789, 'sino').hangul).toBe('일억 이천삼백사십오만 육천칠백팔십구');
    expect(numToHangul(123456789, 'sino').number).toBe(123456789);

    expect(numToHangul(123, 'sino').hangul).toBe('백이십삼');
    expect(numToHangul(123, 'sino').number).toBe(123);

    expect(numToHangul(456, 'sino').hangul).toBe('사백오십육');
    expect(numToHangul(456, 'sino', 'counter').number).toBe(456);

    expect(numToHangul(789, 'sino').hangul).toBe('칠백팔십구');
    expect(numToHangul(789, 'sino').number).toBe(789);

    expect(numToHangul(4321, 'sino').hangul).toBe('사천삼백이십일');
    expect(numToHangul(4321, 'sino').number).toBe(4321);

    expect(numToHangul(56789, 'sino', 'counter').hangul).toBe('오만 육천칠백팔십구');
    expect(numToHangul(56789, 'sino').number).toBe(56789);
  });

  it('handles 0', () => {
    const num = 0;
    const expectedSino = '영';
    expect(numToHangul(num, 'sino').hangul).toBe(expectedSino);
    expect(numToHangul(num, 'sino').number).toBe(num);
  });

  it('does not show 0 if the number simply ends in 0', () => {
    expect(numToHangul(10, 'sino', 'counter').hangul).toBe('십');
    expect(numToHangul(10, 'sino').number).toBe(10);
  });

  it('does not show any unit for the ones place', () => {
    expect(numToHangul(253, 'sino', 'counter').hangul).toBe('이백오십삼');
    expect(numToHangul(253, 'sino').number).toBe(253);
  });

  it('throws errors for numbers outside of [0, 10^15]', () => {
    const problem = 10 ** 15;
    const smallProblem = -5;
    const bigProblem = 10 ** 15 + 20;
    const okay = 10 ** 15 - 1;

    expect(() => numToHangul(problem, 'sino')).toThrowError();
    expect(() => numToHangul(smallProblem, 'sino')).toThrowError();
    expect(() => numToHangul(bigProblem, 'sino')).toThrowError();
    expect(numToHangul(okay, 'sino').number).toBe(999_9999_9999_9999);
    expect(numToHangul(okay, 'sino', 'counter').hangul).toBe(
      '구백구십구조 구천구백구십구억 구천구백구십구만 구천구백구십구'
    );
  });

  it('does not show any unit if any units place digit is 1', () => {
    expect(numToHangul(111_1111_1111_1111, 'sino').hangul).toBe('백십일조 천백십일억 천백십일만 천백십일');
  });

  it('skips unused units', () => {
    expect(numToHangul(1_0111_1011_1101, 'sino').hangul).toBe('일조 백십일억 천십일만 천백일');
    expect(numToHangul(1_0000_0000_0001, 'sino').hangul).toBe('일조 일');
    expect(numToHangul(1_0000_0100_0001, 'sino', 'counter').hangul).toBe('일조 백만 일');
    expect(numToHangul(31_0000_0000_0001, 'sino').hangul).toBe('삼십일조 일');
    expect(numToHangul(1_0000_0001, 'sino').hangul).toBe('일억 일');
    expect(numToHangul(31_0000_0001, 'sino', 'counter').hangul).toBe('삼십일억 일');
    expect(numToHangul(1_0001, 'sino').hangul).toBe('만 일');
    expect(numToHangul(31_0001, 'sino').hangul).toBe('삼십일만 일');
  });
});

describe(`numToHangul(number, 'sino', 'repetition || 'sequence') throw errors`, () => {
  expect(() => numToHangul(5, 'sino', 'repetition')).toThrowError();
  expect(() => numToHangul(5, 'sino', 'sequence')).toThrowError();
});
