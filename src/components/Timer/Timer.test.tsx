import { ThemeProvider } from '@emotion/react';
import { Mock, describe, it, vi } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';
import { act, render, screen } from '@testing-library/react';

import theme from '@style/theme';
import mine from '@fixtures/mine';
import time from '@fixtures/time';
import Timer from '@components/Timer/Timer';
import { setMinute, setSecond } from '@store/timeSlice/timeSlice';

vi.mock('react-redux');
vi.mock('@store/timeSlice/timeSlice');

const dispatch = vi.fn();
const context = describe;
(useDispatch as Mock).mockImplementation(() => dispatch);
(useSelector as Mock).mockImplementation((selector) => selector({ mine: mine, time: time }));

describe('Timer', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Timer />
      </ThemeProvider>,
    );
  });

  it('has time format as 12:10', () => {
    const divEl = screen.getByText('0 : 00');

    expect(divEl).toBeInTheDocument();
  });

  context('isStart is true', () => {
    it('has minute greater than 0 and second equal 0', () => {
      const TIME = { minute: 5, second: 0 };
      (useSelector as Mock).mockImplementationOnce((selector) =>
        selector({ mine: { ...mine, isStart: true }, time: TIME }),
      );

      expect(TIME.minute).toBeGreaterThan(0);
      expect(TIME.second).toBe(0);
      expect(dispatch).toBeCalledWith(setMinute(4));
      expect(dispatch).toBeCalledWith(setSecond(59));
    });

    it('has minute equal 0 and second equal 0', () => {
      (useSelector as Mock).mockImplementationOnce((selector) =>
        selector({ mine: { ...mine, isStart: true }, time: time }),
      );

      expect(time.minute).toBe(0);
      expect(time.second).toBe(0);

      const spy = vi.spyOn(window, 'clearTimeout');

      act(() => window.clearTimeout(expect.any(Number)));

      expect(spy).toBeCalled();
    });

    it('has minute 4 and second 20', () => {
      const TIME = { minute: 4, second: 20 };
      (useSelector as Mock).mockImplementationOnce((selector) =>
        selector({ mine: { ...mine, isStart: true }, time: TIME }),
      );

      expect(dispatch).toBeCalledWith(setSecond(19));
    });
  });

  context('isStart is false', () => {
    it('has reset timer', () => {
      expect(dispatch).toBeCalledWith(setMinute(0));
      expect(dispatch).toBeCalledWith(setSecond(0));
    });
  });
});
