import { ThemeProvider } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';

import { Mock, describe, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, renderHook, screen, waitFor } from '@testing-library/react';

import theme from '@style/theme';
import mine from '@fixtures/mine';
import useSetMine from '@hooks/useSetMine';
import { setMinute } from '@store/timeSlice';
import useCheckMine from '@hooks/useCheckMine';
import Minesweeper from '@components/Minesweeper/Minesweeper';

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
        result: {
          current: { setMine },
        },
      } = renderHook(() => useSetMine());

      await user.click(cell_0_0);

      waitFor(() => {
        expect(setMine).toBeCalled();
        expect(dispatch).toBeCalledWith(setMinute(5));
      });
    });

    it('is executed startGame function in isStart true', async () => {
      const cell_0_0 = screen.getByTestId('cell-0-0');
      const {
        result: {
          current: { checkMine },
        },
      } = renderHook(() => useCheckMine());

      await user.click(cell_0_0);

      waitFor(() => {
        expect(checkMine).toBeCalled();
      });
    });
  });
});
