/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { css, Theme, useTheme } from '@emotion/react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@store/store';
import useSetMine from '@hooks/useSetMine';
import { setMinute } from '@store/timeSlice';
import { resetMine } from '@store/mineSlice';
import useCheckMine from '@hooks/useCheckMine';

// 주변 지뢰 갯수를 보여주는 숫자들의 색상
const colors = ['#BDBDBD', 'red', 'orange', 'yellow', 'green', 'blue', 'navy', 'purple'];

export default function Minesweeper() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { setMine } = useSetMine(); // 블록을 클릭시 랜덤하게 지뢰 생성하는 함수
  const { checkMine } = useCheckMine(); // 클릭한 블록 주변에 지뢰가 존재하는지 확인하는 함수
  const { mine, isStart, isFindMine, isDone, row, col } = useSelector((state: RootState) => state.mine);

  // 영역을 클릭하면 실행하는 함수
  const startGame = (currentRow: number, currentCol: number) => {
    if (!isStart) return setMine(currentRow, currentCol), dispatch(setMinute(5)); // 만약 게임 시작을 안했으면 지뢰 셋팅
    if (isStart) return checkMine(mine, currentRow, currentCol); // 시작했으면 주변에 지뢰를 탐색
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
                      key={col}
                      css={mineSweeperCss.td(theme, value, isFindMine)}>
                      {isFindMine && value === 10 ? '💣' : value}
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
      minWidth: '25px',
      minHeight: '25px',
      border: '1px solid white',
      cursor: 'pointer',
      textAlign: 'center',
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
