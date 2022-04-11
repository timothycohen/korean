import SSRSettings from './SSRSettings';

describe('ssrSettings', (): void => {
  test('.create() makes unique objects', (): void => {
    const a = new SSRSettings();
    const b = new SSRSettings();
    expect(a).not.toBe(b);
  });

  test('.create() makes writable objects', (): void => {
    const a = new SSRSettings();
    const b = new SSRSettings();
    const c = new SSRSettings({ easyBonus: 5 });
    a.easyBonus = 5;
    expect(a.easyBonus).toBe(5);
    expect(a.easyBonus).toBe(c.easyBonus);
    expect(a.easyBonus).not.toBe(b.easyBonus);
  });

  test('.default() provides a (compile time) readonly singleton', (): void => {
    const d = SSRSettings.standard;
    const e = SSRSettings.standard;
    expect(d).toBe(e);
    // Cannot assign to 'againPenalty' because it is a read-only property.ts(2540)
    // d.againPenalty = 999;
  });
});
