import { HangulNumber } from './HangulNumber';
import { nativeSnapshot } from './nativeSnapshot';

describe('nativeCardinal fromNumber', () => {
  const nativeCardinal = HangulNumber.createNative('cardinal');
  it('returns the expected value', () => {
    expect(nativeCardinal.fromNumber(5).hangul).toBe('다섯');
    expect(nativeCardinal.fromNumber(11).hangul).toBe('열하나');
    expect(nativeCardinal.fromNumber(37).hangul).toBe('서른일곱');
    expect(nativeCardinal.fromNumber(99).hangul).toBe('아흔아홉');
  });

  it('handles 0', () => {
    expect(nativeCardinal.fromNumber(0).hangul).toBe('영');
    expect(nativeCardinal.fromNumber(0).number).toBe(0);
  });

  it('does not show 0 if the number simply ends in 0', () => {
    expect(nativeCardinal.fromNumber(10).hangul).toBe('열');
    expect(nativeCardinal.fromNumber(10).number).toBe(10);
    expect(nativeCardinal.fromNumber(60).hangul).toBe('예순');
    expect(nativeCardinal.fromNumber(60).number).toBe(60);
  });

  it('throws errors for numbers outside [0, 99]', () => {
    const problem = 100;
    const smallProblem = -5;
    const bigProblem = 105;

    expect(() => nativeCardinal.fromNumber(problem)).toThrowError();
    expect(() => nativeCardinal.fromNumber(smallProblem)).toThrowError();
    expect(() => nativeCardinal.fromNumber(bigProblem)).toThrowError();
  });
});

describe('nativeCounter fromNumber takes care of special numbers', () => {
  const nativeCounter = HangulNumber.createNative('counter');

  it('returns the expected value', () => {
    expect(nativeCounter.fromNumber(1).hangul).toBe('한');
    expect(nativeCounter.fromNumber(2).hangul).toBe('두');
    expect(nativeCounter.fromNumber(3).hangul).toBe('세');
    expect(nativeCounter.fromNumber(4).hangul).toBe('네');
    expect(nativeCounter.fromNumber(20).hangul).toBe('스무');
    expect(nativeCounter.fromNumber(21).hangul).toBe('스물한');
    expect(nativeCounter.fromNumber(37).hangul).toBe('서른일곱');
  });
});

describe('nativeRepetition fromNumber', () => {
  const nativeRepetition = HangulNumber.createNative('repetition');

  it('returns the expected value', () => {
    expect(nativeRepetition.fromNumber(5).hangul).toBe('다섯 번째');
    expect(nativeRepetition.fromNumber(5).number).toBe(5);
  });

  it('returns the expected value', () => {
    expect(nativeRepetition.fromNumber(17).hangul).toBe('열일곱 번째');
    expect(nativeRepetition.fromNumber(17).number).toBe(17);
  });

  it('returns the expected value', () => {
    expect(nativeRepetition.fromNumber(37).hangul).toBe('서른일곱 번째');
    expect(nativeRepetition.fromNumber(37).number).toBe(37);
  });

  it('returns the expected value', () => {
    expect(nativeRepetition.fromNumber(99).hangul).toBe('아흔아홉 번째');
    expect(nativeRepetition.fromNumber(99).number).toBe(99);
  });

  test('0 is out of scope for ordinals', () => {
    expect(() => nativeRepetition.fromNumber(0)).toThrowError();
  });

  it('handles the special 1 case', () => {
    expect(nativeRepetition.fromNumber(1).hangul).toBe('첫 번째');
    expect(nativeRepetition.fromNumber(1).number).toBe(1);
  });

  it('treats 11, 21, etc. as normal', () => {
    expect(nativeRepetition.fromNumber(11).hangul).toBe('열한 번째');
    expect(nativeRepetition.fromNumber(11).number).toBe(11);
  });

  it('does not show 0 if the number simply ends in 0', () => {
    expect(nativeRepetition.fromNumber(10).hangul).toBe('열 번째');
    expect(nativeRepetition.fromNumber(10).number).toBe(10);
    expect(nativeRepetition.fromNumber(60).hangul).toBe('예순 번째');
    expect(nativeRepetition.fromNumber(60).number).toBe(60);
  });

  it('throws errors for numbers outside [0, 99]', () => {
    const problem = 100;
    const smallProblem = -5;
    const bigProblem = 105;

    expect(() => nativeRepetition.fromNumber(problem)).toThrowError();
    expect(() => nativeRepetition.fromNumber(smallProblem)).toThrowError();
    expect(() => nativeRepetition.fromNumber(bigProblem)).toThrowError();
  });
});

describe('nativeSequence fromNumber', () => {
  const nativeSequence = HangulNumber.createNative('sequence');

  it('returns the expected value', () => {
    expect(nativeSequence.fromNumber(5).hangul).toBe('다섯째');
    expect(nativeSequence.fromNumber(5).number).toBe(5);
  });

  it('returns the expected value', () => {
    expect(nativeSequence.fromNumber(17).hangul).toBe('열일곱째');
    expect(nativeSequence.fromNumber(17).number).toBe(17);
  });

  it('returns the expected value', () => {
    expect(nativeSequence.fromNumber(37).hangul).toBe('서른일곱째');
    expect(nativeSequence.fromNumber(37).number).toBe(37);
  });

  it('returns the expected value', () => {
    expect(nativeSequence.fromNumber(99).hangul).toBe('아흔아홉째');
    expect(nativeSequence.fromNumber(99).number).toBe(99);
  });

  test('0 is out of scope for ordinals', () => {
    expect(() => nativeSequence.fromNumber(0)).toThrowError();
  });

  it('handles the special 1 case', () => {
    expect(nativeSequence.fromNumber(1).hangul).toBe('첫째');
    expect(nativeSequence.fromNumber(1).number).toBe(1);
  });

  it('uses native unmodified numbers', () => {
    expect(nativeSequence.fromNumber(2).hangul).toBe('둘째');
    expect(nativeSequence.fromNumber(2).number).toBe(2);
  });

  it('treats 11, 21, 12, 22, etc. as modified', () => {
    expect(nativeSequence.fromNumber(11).hangul).toBe('열한째');
    expect(nativeSequence.fromNumber(12).hangul).toBe('열두째');
    expect(nativeSequence.fromNumber(21).hangul).toBe('스물한째');
    expect(nativeSequence.fromNumber(22).hangul).toBe('스물두째');
  });

  it('does not show 0 if the number simply ends in 0', () => {
    expect(nativeSequence.fromNumber(10).hangul).toBe('열째');
    expect(nativeSequence.fromNumber(10).number).toBe(10);
    expect(nativeSequence.fromNumber(60).hangul).toBe('예순째');
    expect(nativeSequence.fromNumber(60).number).toBe(60);
  });

  it('throws errors for numbers outside [0, 99]', () => {
    const problem = 100;
    const smallProblem = -5;
    const bigProblem = 105;

    expect(() => nativeSequence.fromNumber(problem)).toThrowError();
    expect(() => nativeSequence.fromNumber(smallProblem)).toThrowError();
    expect(() => nativeSequence.fromNumber(bigProblem)).toThrowError();
  });
});

describe('native getRandom', () => {
  it('generates a cardinal number that can be parsed', () => {
    const nativeCardinal = HangulNumber.createNative('cardinal');
    const randomCardinal = nativeCardinal.getRandom();
    const parsedCardinal = nativeCardinal.fromNumber(randomCardinal.number);
    expect(randomCardinal).toStrictEqual(parsedCardinal);
  });

  it('generates a counter number that can be parsed', () => {
    const nativeCounter = HangulNumber.createNative('counter');
    const randomCounter = nativeCounter.getRandom();
    const parsedCounter = nativeCounter.fromNumber(randomCounter.number);
    expect(randomCounter).toStrictEqual(parsedCounter);
  });

  it('generates an ordinal repetition number that can be parsed', () => {
    const nativeRepetition = HangulNumber.createNative('repetition');
    const randomRepetition = nativeRepetition.getRandom();
    const parsedRepetition = nativeRepetition.fromNumber(randomRepetition.number);
    expect(randomRepetition).toStrictEqual(parsedRepetition);
  });

  it('generates an ordinal sequence number that can be parsed', () => {
    const nativeSequence = HangulNumber.createNative('sequence');
    const randomSequence = nativeSequence.getRandom();
    const parsedSequence = nativeSequence.fromNumber(randomSequence.number);
    expect(randomSequence).toStrictEqual(parsedSequence);
  });
});

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

describe('printAll matches snapshot', () => {
  test('native', () => {
    const nativeCardinalGen = HangulNumber.createNative('cardinal').printAll();
    const nativeCounterGen = HangulNumber.createNative('counter').printAll();
    const nativeSequenceGen = HangulNumber.createNative('sequence').printAll();
    const nativeRepetitionGen = HangulNumber.createNative('repetition').printAll();

    expect(nativeCardinalGen).toStrictEqual(nativeSnapshot.cardinal);
    expect(nativeCounterGen).toStrictEqual(nativeSnapshot.counter);
    expect(nativeSequenceGen).toStrictEqual(nativeSnapshot.sequence);
    expect(nativeRepetitionGen).toStrictEqual(nativeSnapshot.repetition);
  });
});
