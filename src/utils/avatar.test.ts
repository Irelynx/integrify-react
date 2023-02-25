import { describe, expect, it } from 'vitest';

import { stringAvatar } from './avatar';

describe('utils - stringAvatar', () => {
  it('must not throw on various inputs', () => {
    stringAvatar('');
    stringAvatar('A');
    stringAvatar('A B');
    stringAvatar('A B C');
    expect(true).toBe(true);
  });

  it('must return background color', () => {
    const result = stringAvatar('');
    expect(result?.sx.bgcolor).toBeDefined();
  });

  it('must return component children', () => {
    const result = stringAvatar('');
    expect(result?.children).toBeDefined();
  });

  it('must return one character if no spaces in string', () => {
    const testString = 'First';
    const result = stringAvatar(testString);
    expect(result?.children).toBe(testString[0]);
  });

  it('must return two characters if 1 space in string', () => {
    const testString = 'First Last';
    const result = stringAvatar(testString);
    expect(result?.children).toBe(
      testString
        .split(' ')
        .map((str) => str[0])
        .join(''),
    );
  });

  it('must return only two characters if more than 1 spaces in string', () => {
    const testString = 'First Last Middle';
    const result = stringAvatar(testString);
    expect(result?.children).toBe(
      testString
        .split(' ')
        .map((str) => str[0])
        .slice(0, 2)
        .join(''),
    );
  });
});
