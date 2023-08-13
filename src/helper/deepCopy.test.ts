import { test } from 'vitest';
import deepCopy from './deepCopy';

test('argument is string or number', () => {
  const argString = 'test';

  expect(deepCopy(argString)).toBe('test');

  const argNumber = 123;

  expect(deepCopy(argNumber)).toBe(123);
});

test('argument is Array', () => {
  const argSingleArray = [1, 2, 3];

  expect(deepCopy(argSingleArray)).toEqual([1, 2, 3]);

  const argDeepArray = [[1, 2, 3], [3, 4], 5];

  expect(deepCopy(argDeepArray)).toEqual([[1, 2, 3], [3, 4], 5]);
});

test('argument is object', () => {
  const argSingleObj = { a: 1, b: 2, c: 3 };

  expect(deepCopy(argSingleObj)).toEqual({ a: 1, b: 2, c: 3 });

  const argDeepArray = { a: { b: 1, c: 2 }, d: { e: { f: 1, g: 2 } } };

  expect(deepCopy(argDeepArray)).toEqual({ a: { b: 1, c: 2 }, d: { e: { f: 1, g: 2 } } });
});

test('deepCopy result is change value, not equal origin value', () => {
  const originValue = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const deepCopyValue = deepCopy(originValue);

  deepCopyValue[1] = [7, 7, 7];

  expect(originValue).not.toEqual(deepCopyValue);
});

test('deepCopy result is change value, not equal origin value', () => {
  const originValue = { a: { b: 1, c: 2 }, d: { e: 3, f: 4 } };
  const deepCopyValue = deepCopy(originValue);

  deepCopyValue.a = { b: 0, c: 0 };

  expect(originValue).not.toEqual(deepCopyValue);
});
