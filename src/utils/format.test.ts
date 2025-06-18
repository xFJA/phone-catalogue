import { formatPrice } from './format';

describe('formatPrice', () => {
  it('formats integer price correctly', () => {
    expect(formatPrice(1234)).toBe('1,234 EUR');
    expect(formatPrice(0)).toBe('0 EUR');
    expect(formatPrice(1000000)).toBe('1,000,000 EUR');
  });

  it('formats price with decimals by rounding down', () => {
    expect(formatPrice(1234.56)).toBe('1,235 EUR');
    expect(formatPrice(999.49)).toBe('999 EUR');
  });

  it('handles negative prices', () => {
    expect(formatPrice(-100)).toBe('-100 EUR');
  });
});
