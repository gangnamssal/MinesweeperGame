import { Mock, test, vi } from 'vitest';
import { useDispatch, useSelector } from 'react-redux';
import { act, renderHook } from '@testing-library/react';

import mine from '@fixtures/mine';
import checkDone from '@helper/checkDone';
import useCheckMine from '@hooks/useCheckMine';
import { changeMine, findMine, setIsDone, stackPush, visitedPush } from '@store/mineSlice';

vi.mock('react-redux');

const dispatch = vi.fn();
const MINE = [
  [-1, -1, 10, -1, -1],
  [10, 10, -1, -1, 10, -1],
  [-1, 10, -1, -1, 10, -1],
  [10, -1, 10, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
];

(useDispatch as Mock).mockImplementation(() => dispatch);
(useSelector as Mock).mockImplementation((selector) => selector({ mine: { ...mine, mine: MINE } }));

test('useCheckMine is called', () => {
  const {
    result: { current },
  } = renderHook(() => useCheckMine());

  vi.spyOn(current, 'checkMine');

  act(() => current.checkMine(MINE, 0, 0));

  expect(dispatch).toBeCalled();
});

test('you find mine', () => {
  const {
    result: { current },
  } = renderHook(() => useCheckMine());

  vi.spyOn(current, 'checkMine');

  act(() => current.checkMine(MINE, 0, 2));

  expect(dispatch).toBeCalledWith(findMine());
});

describe('you don`t find mine', () => {
  it('is finished', () => {
    expect(checkDone(MINE)).toBeTruthy();
    expect(dispatch).toBeCalledWith(setIsDone());
  });

  it('is not finished', () => {
    const MINE = [
      [0, 0, 10, 0],
      [10, 0, 10, 0],
    ];

    const {
      result: { current },
    } = renderHook(() => useCheckMine());

    vi.spyOn(current, 'checkMine');

    act(() => current.checkMine(MINE, 0, 0));

    expect(checkDone(mine.mine)).toBeFalsy();
    expect(dispatch).toBeCalledWith(changeMine(expect.any(Array)));
    expect(dispatch).toBeCalledWith(stackPush(expect.any(Array)));
    expect(dispatch).toBeCalledWith(visitedPush(expect.any(Array)));
  });
});
