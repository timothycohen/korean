import SRSettings from './SRSettings';

describe('srSettings', (): void => {
  test('.create() makes unique objects', (): void => {
    const a = new SRSettings();
    const b = new SRSettings();
    expect(a).not.toBe(b);
  });

  test('.create() makes writable objects', (): void => {
    const a = new SRSettings();
    const b = new SRSettings();
    const c = new SRSettings({ easyBonus: 5 });
    a.easyBonus = 5;
    expect(a.easyBonus).toBe(5);
    expect(a.easyBonus).toBe(c.easyBonus);
    expect(a.easyBonus).not.toBe(b.easyBonus);
  });

  test('.default() provides a (compile time) readonly singleton', (): void => {
    const d = SRSettings.standard;
    const e = SRSettings.standard;
    expect(d).toBe(e);
    // Cannot assign to 'againPenalty' because it is a read-only property.ts(2540)
    // d.againPenalty = 999;
  });
});
