/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { css, Theme, useTheme } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';

import deepCopy from '@helper/deepCopy';
import { RootState } from '@store/store';
import useSetMine from '@hooks/useSetMine';
import useCheckMine from '@hooks/useCheckMine';
import { setMinute } from '@store/timeSlice/timeSlice';
import { resetMine, setFlag } from '@store/mineSlice/mineSlice';

// 주변 지뢰 갯수를 보여주는 숫자들의 색상
const colors = ['#BDBDBD', 'red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple'];

export default function Minesweeper() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { setMine } = useSetMine(); // 블록을 클릭시 랜덤하게 지뢰 생성하는 함수
  const { checkMine } = useCheckMine(); // 클릭한 블록 주변에 지뢰가 존재하는지 확인하는 함수
  const { mine, isStart, isFindMine, isDone, row, col } = useSelector((state: RootState) => state.mine);

  // 영역을 클릭하면 실행하는 함수
  // 11 : 지뢰가 없는 영역의 플래그
  // 12 : 지뢰가 있는 영역의 플래그
  const startGame = (currentRow: number, currentCol: number) => {
    // 만약 게임 시작을 안했으면 지뢰 셋팅
    if (!isStart && mine[currentRow][currentCol] !== 11 && mine[currentRow][currentCol] !== 12)
      return setMine(currentRow, currentCol), dispatch(setMinute(5));

    // 시작했으면 바로 주변에 지뢰를 탐색
    if (isStart && mine[currentRow][currentCol] !== 11 && mine[currentRow][currentCol] !== 12)
      return checkMine(mine, currentRow, currentCol);
  };

  // 영역에 우클릭하면 실행되는 함수
  const rightClickEvent = (e: React.MouseEvent<HTMLTableCellElement>, row: number, col: number) => {
    e.preventDefault();
    if (isStart && (mine[row][col] === 0 || mine[row][col] === 10)) dispatch(setFlag(mineSetFlag(mine, row, col)));
    if (isStart && (mine[row][col] === 11 || mine[row][col] === 12)) dispatch(setFlag(mineDeleteFlag(mine, row, col)));
  };

  // 만약 지뢰를 클릭했으면 실행되는 부분
  useEffect(() => {
    if (isFindMine) {
      setTimeout(() => {
        alert('실패했습니다.');
        dispatch(resetMine({ row, col }));
      }, 200);
    }
  }, [isFindMine, dispatch]);

  // 지뢰를 클릭하지 않고 모든 빈칸을 찾았다면 게임을 종료
  useEffect(() => {
    if (isDone) {
      setTimeout(() => {
        alert('성공했습니다.');
        dispatch(resetMine({ row, col }));
      }, 500);
    }
  }, [isDone, dispatch]);

  return (
    <div css={mineSweeperCss.container}>
      <table css={mineSweeperCss.table(theme)}>
        <tbody>
          {mine.map((MINE, row) => {
            return (
              <tr key={row}>
                {MINE.map((value, col) => {
                  return (
                    <td
                      data-testid={`cell-${row}-${col}`}
                      onClick={() => startGame(row, col)}
                      onContextMenu={(e) => rightClickEvent(e, row, col)}
                      key={col}
                      css={mineSweeperCss.td(theme, value, isFindMine)}>
                      {isFindMine && value == 10 ? '💣' : value == 11 || value == 12 ? '🚩' : value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const mineSetFlag = (mine: number[][], row: number, col: number) => {
  const newMine = deepCopy(mine);

  if (newMine[row][col] === 0) newMine[row][col] = 11;
  if (newMine[row][col] === 10) newMine[row][col] = 12;

  return newMine;
};

const mineDeleteFlag = (mine: number[][], row: number, col: number) => {
  const newMine = deepCopy(mine);

  if (newMine[row][col] === 11) newMine[row][col] = 0;
  if (newMine[row][col] === 12) newMine[row][col] = 10;

  return newMine;
};

const mineSweeperCss = {
  container: () =>
    css({
      width: '100%',
      height: '100%',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none',
    }),

  table: (theme: Theme) =>
    css({
      minWidth: '350px',
      minHeight: '350px',
      border: '1px solid white',
      backgroundColor: `${theme.color.gray}`,
    }),

  td: (theme: Theme, value: number, isFindMine: boolean) =>
    css({
      minWidth: '15px',
      minHeight: '15px',
      border: '1px solid white',
      cursor: 'pointer',
      textAlign: 'center',
      fontSize: '0.7rem',
      backgroundColor: `${value < 10 && value !== 0 ? theme.color.gray : theme.color.lightGray}`,

      color: `${
        value === -1
          ? theme.color.gray
          : value === 10
          ? isFindMine
            ? theme.color.gray
            : theme.color.lightGray
          : colors[value]
      }`,
    }),
};
