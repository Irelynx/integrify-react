import { describe, it, expect } from 'vitest';

import { api, API } from '.';

describe('RestCountries API v3.1', () => {
  it('version must be 3.1', () => {
    expect(API.version).toBe('v3.1');
  });
  return;
  it('must return Array in getAll method', async () => {
    const result = await api.getAll();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });
});
