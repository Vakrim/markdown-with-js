import { interprete } from './interpretor';

describe('interpertor', () => {
  it('adds numbers', () => {
    expect(interprete('3 + 3')).toBe(6);
  });

  it('adds multiplies', () => {
    expect(interprete('1 + 2 * 3')).toBe(7);
  });

  it('supports brackets', () => {
    expect(interprete('(1 + 2) * 3')).toBe(9);
  });

  it('supports variables', () => {
    expect(interprete('str * 2', { str: 3 })).toBe(6);
  });

  describe('supports functions', () => {
    it('ceil', () => {
      expect(interprete('ceil(str / 2)', { str: 3 })).toBe(2);
    });

    it('floor', () => {
      expect(interprete('floor(str / 2)', { str: 3 })).toBe(1);
    });
  });
});
