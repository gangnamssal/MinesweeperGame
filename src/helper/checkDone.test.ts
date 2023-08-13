import { test } from 'vitest';
import checkDone from './checkDone';

test('checkDone function return true', () => {
  const mine = [
    [1, 1, 1],
    [1, 1, 1],
  ];

  expect(checkDone(mine)).toBeTruthy();
});

test('checkDone function return false', () => {
  const mine = [
    [1, 1, 1],
    [1, 1, 0],
  ];

  expect(checkDone(mine)).toBeFalsy();
});
