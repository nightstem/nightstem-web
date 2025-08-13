import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { randomInt } from '@/utils/randomInt';

const mockGetRandomValues = vi.fn();

beforeEach(() => {
  Object.defineProperty(global, 'window', {
    value: { crypto: { getRandomValues: mockGetRandomValues } },
    writable: true,
  });
  Object.defineProperty(global, 'crypto', {
    value: { getRandomValues: mockGetRandomValues },
    writable: true,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('edge cases', () => {
  it('returns 0 when max is 0', () => {
    expect(randomInt(0)).toBe(0);
  });

  it('returns 0 when max is 1', () => {
    expect(randomInt(1)).toBe(0);
  });

  it('returns 0 when max is negative', () => {
    expect(randomInt(-5)).toBe(0);
  });
});

describe('range constraints', () => {
  it('returns values within specified range', () => {
    const testValues = [0, 1073741824, 2147483648, 3221225472, 4294967295];

    testValues.forEach((cryptoValue) => {
      mockGetRandomValues.mockImplementation((buf) => {
        buf[0] = cryptoValue;
        return buf;
      });

      const max = 10;
      const result = randomInt(max);

      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(max);
      expect(Number.isInteger(result)).toBe(true);
    });
  });

  it('works with different max values', () => {
    const maxValues = [2, 5, 10, 50, 100];

    maxValues.forEach((max) => {
      mockGetRandomValues.mockImplementation((buf) => {
        buf[0] = 2147483648;
        return buf;
      });

      const result = randomInt(max);

      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(max);
      expect(Number.isInteger(result)).toBe(true);
    });
  });
});
