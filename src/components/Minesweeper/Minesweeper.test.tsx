import { ThemeProvider } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';

import { Mock, describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, renderHook, screen, waitFor } from '@testing-library/react';

import theme from '@style/theme';
import mine from '@fixtures/mine';
import useSetMine from '@hooks/useSetMine';
import useCheckMine from '@hooks/useCheckMine';
import { setMinute } from '@store/timeSlice/timeSlice';
import Minesweeper from '@components/Minesweeper/Minesweeper';
import { changeMine, resetMine } from '@store/mineSlice/mineSlice';

vi.mock('react-redux');

const dispatch = vi.fn();
const context = describe;
const user = userEvent.setup();

(useDispatch as Mock).mockImplementation(() => dispatch);
(useSelector as Mock).mockImplementation((selector) => selector({ mine: mine }));

describe('Minesweeper', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <Minesweeper />
      </ThemeProvider>,
    );
  });

  it('have table tag', () => {
    const tableEl = screen.getByRole('table');

    expect(tableEl).toBeInTheDocument();
  });

  context('when I clicked on td tag', () => {
    it('is executed startGame function in isStart false', async () => {
      const cell_0_0 = screen.getByTestId('cell-0-0');

      const {
        result: { current },
      } = renderHook(() => useSetMine());

      const spy = vi.spyOn(current, 'setMine');

      expect(spy).not.toBeCalled();

      await user.click(cell_0_0);

      await waitFor(() => {
        expect(dispatch).toBeCalledWith(changeMine(expect.any(Array)));
        expect(dispatch).toBeCalledWith(setMinute(5));
      });
    });

    it('is executed startGame function in isStart true', async () => {
      const cell_0_0 = screen.getByTestId('cell-0-0');
      (useSelector as Mock).mockImplementationOnce((selector) => selector({ mine: { ...mine, isStart: true } }));

      const {
        result: { current },
      } = renderHook(() => useCheckMine());

      const spy = vi.spyOn(current, 'checkMine');

      expect(spy).not.toBeCalled();

      await user.click(cell_0_0);

      await waitFor(() => {
        expect(dispatch).toBeCalledWith(changeMine(expect.any(Array)));
      });
    });
  });

  it('is finding mine', () => {
    (useSelector as Mock).mockImplementationOnce((selector) => selector({ mine: { ...mine, isFindMine: true } }));

    setTimeout(() => {
      expect(dispatch).toBeCalledWith(resetMine({ row: 0, col: 0 }));
    }, 200);
  });

  it('is finish mine game', () => {
    (useSelector as Mock).mockImplementationOnce((selector) => selector({ mine: { ...mine, isDone: true } }));

    setTimeout(() => {
      expect(dispatch).toBeCalledWith(resetMine({ row: 0, col: 0 }));
    }, 500);
  });
});
