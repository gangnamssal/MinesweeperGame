import { describe, it } from 'vitest';

import time from '@fixtures/time';
import reducer, { setMinute, setSecond } from '@store/timeSlice';

const context = describe;

describe('timeSlice', () => {
  context('setMinute', () => {
    it('set minute', () => {
      const state = reducer(time, setMinute(5));

      expect(state.minute).toBe(5);
    });
  });

  context('setSecond', () => {
    it('set second', () => {
      const state = reducer(time, setSecond(40));

      expect(state.second).toBe(40);
    });
  });
});
