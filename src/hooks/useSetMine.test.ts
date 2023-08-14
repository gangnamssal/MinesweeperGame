import { Mock, test, vi } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';

import mine from '@fixtures/mine';
import useSetMine from '@hooks/useSetMine';
import useCheckMine from '@hooks/useCheckMine';
import { changeMine } from '@store/mineSlice/mineSlice';
import { act, renderHook } from '@testing-library/react';

vi.mock('react-redux');

const dispatch = vi.fn();

(useDispatch as Mock).mockImplementation(() => dispatch);
(useSelector as Mock).mockImplementation((selector) => selector({ mine: mine }));

test('useSetMine is called', () => {
  const {
    result: { current: setMineCurrent },
  } = renderHook(() => useSetMine());

  const {
    result: { current: checkMineCurrent },
  } = renderHook(() => useCheckMine());

  vi.spyOn(setMineCurrent, 'setMine');
  vi.spyOn(checkMineCurrent, 'checkMine');

  act(() => {
    setMineCurrent.setMine(0, 0);
    checkMineCurrent.checkMine(mine.mine, 0, 0);
  });

  expect(dispatch).toBeCalledWith(changeMine(expect.any(Array)));
  expect(checkMineCurrent.checkMine).toBeCalled();
});
