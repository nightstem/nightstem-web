import { describe, expect, it } from 'vitest';

import { hashIndex } from '@/utils/hashIndex';

describe('edge cases', () => {
  it('returns 0 when max is 0', () => {
    expect(hashIndex('test', 0)).toBe(0);
  });

  it('returns 0 when max is 1', () => {
    expect(hashIndex('test', 1)).toBe(0);
  });

  it('returns 0 for empty string', () => {
    expect(hashIndex('', 5)).toBe(0);
  });

  it('handles negative max by returning 0', () => {
    expect(hashIndex('test', -1)).toBe(0);
  });
});

describe('deterministic behavior', () => {
  it('returns same index for same input', () => {
    const seed = '/products/123';
    const max = 10;
    const result1 = hashIndex(seed, max);
    const result2 = hashIndex(seed, max);

    expect(result1).toBe(result2);
  });

  it('produces consistent results across multiple calls', () => {
    const testCases = [
      { seed: '/', max: 5 },
      { seed: '/about', max: 3 },
      { seed: '/products/123', max: 7 },
      { seed: '/very/long/path/with/many/segments', max: 12 },
    ];

    testCases.forEach(({ seed, max }) => {
      const results = Array.from({ length: 10 }, () => hashIndex(seed, max));
      const [firstResult] = results;

      expect(results.every((result) => result === firstResult)).toBe(true);
    });
  });
});

describe('range constraints', () => {
  it('returns values within specified range', () => {
    const testCases = [
      { seed: 'test1', max: 5 },
      { seed: 'test2', max: 10 },
      { seed: 'test3', max: 100 },
      { seed: 'very-long-string-with-many-characters', max: 50 },
    ];

    testCases.forEach(({ seed, max }) => {
      const result = hashIndex(seed, max);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(max);
      expect(Number.isInteger(result)).toBe(true);
    });
  });
});
