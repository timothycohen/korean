import { HangulNumber } from './HangulNumber';

describe('min', () => {
  test('max in range changes', () => {
    const nativeCardinal = HangulNumber.createNative('cardinal');
    nativeCardinal.max = 5;
    expect(nativeCardinal.max).toBe(5);
  });

  test('absMax is unchanged', () => {
    const nativeCardinal = HangulNumber.createNative('cardinal');
    const previousAbsMax = nativeCardinal.absMax;
    nativeCardinal.max = 5;
    expect(nativeCardinal.absMax).toBe(previousAbsMax);
  });
  test('max below min throws', () => {
    const nativeCardinal = HangulNumber.createNative('cardinal');
    nativeCardinal.min = 7;
    expect(() => (nativeCardinal.max = 0)).toThrowError();
  });
  test('max below absMin throws', () => {
    const nativeCardinal = HangulNumber.createNative('cardinal');
    expect(() => (nativeCardinal.max = -1)).toThrowError();
  });
  test('max above absMax throws', () => {
    const nativeCardinal = HangulNumber.createNative('cardinal');
    expect(() => (nativeCardinal.max = 101)).toThrowError();
  });
});

describe('max', () => {
  test('max in range changes', () => {
    const nativeCardinal = HangulNumber.createNative('cardinal');
    nativeCardinal.min = 5;
    expect(nativeCardinal.min).toBe(5);
  });

  test('absMin is unchanged', () => {
    const nativeCardinal = HangulNumber.createNative('cardinal');
    const previousAbsMin = nativeCardinal.absMin;
    nativeCardinal.min = 5;
    expect(nativeCardinal.absMin).toBe(previousAbsMin);
  });
  test('min above max throws', () => {
    const nativeCardinal = HangulNumber.createNative('cardinal');
    nativeCardinal.max = 7;
    expect(() => (nativeCardinal.min = 9)).toThrowError();
  });
  test('min below absMin throws', () => {
    const nativeCardinal = HangulNumber.createNative('cardinal');
    expect(() => (nativeCardinal.min = -1)).toThrowError();
  });
  test('min above absMax throws', () => {
    const nativeCardinal = HangulNumber.createNative('cardinal');
    expect(() => (nativeCardinal.min = 100)).toThrowError();
  });
});

describe('range', () => {
  test('max in range changes', () => {
    const nativeCardinal = HangulNumber.createNative('cardinal');
    expect(nativeCardinal.range).toStrictEqual([0, 99]);
    nativeCardinal.range = [5, 23];
    expect(nativeCardinal.range).toStrictEqual([5, 23]);
    nativeCardinal.range = [17, 3];
    expect(nativeCardinal.range).toStrictEqual([3, 17]);
    expect(() => (nativeCardinal.range = [-5, 99])).toThrowError();
    expect(() => (nativeCardinal.range = [8, 103])).toThrowError();
  });
});
