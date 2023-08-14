import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import deepCopy from '@helper/deepCopy';
import { RootState } from '@store/store';
import checkDone from '@helper/checkDone';
import { changeMine, findMine, setIsDone, stackPush, visitedPush } from '@store/mineSlice/mineSlice';

export default function useCheckMine() {
  const dispatch = useDispatch();
  const { stack, visited, row, col } = useSelector((state: RootState) => state.mine);

  const cnt = useRef<number>(0); // 지뢰 수
  const dr = useRef<number[]>([-1, -1, 0, 1, 1, 1, 0, -1]); // 클릭한 부분 8방으로 탐색
  const dc = useRef<number[]>([0, 1, 1, 1, 0, -1, -1, -1]); // 클릭한 부분 8방으로 탐색

  const checkMine = (mine: number[][], currentRow: number, currentCol: number) => {
    let deepCopyStack = deepCopy(stack); // redux에 저장된 stack 클론
    const deepCopyMine = deepCopy(mine); // redux에 저장된 지뢰맵 클론
    const deepCopyVisited = deepCopy(visited); // redux에 저장된 visited 클론

    // 만약 클릭한 자리에 지뢰가 있다면 지뢰를 찾았다고 변경
    if (deepCopyMine[currentRow][currentCol] === 10) return dispatch(findMine());

    deepCopyStack.push([currentRow, currentCol]); // 클릭한 부분을 stack에 삽입
    deepCopyVisited[currentRow][currentCol] = 1; // 방문표시

    // dfs를 수행하는 helper 함수
    function helper() {
      if (!deepCopyStack.length) return; // stack이 비어있으면 재귀를 종료
      const [r, c] = deepCopyStack.pop() as number[]; // stack에서 row, col을 추출

      let arr: number[][] = []; // 방문한 위치를 임시로 저장하는 배열
      deepCopyMine[r][c] = -1; // 방문한 곳에 지뢰가 없으면 -1로 표시
      cnt.current = 0; // 지뢰 수를 0으로 초기화

      for (let i = 0; i < 8; i++) {
        const nr = r + dr.current[i]; // 8방의 위치를 확인
        const nc = c + dc.current[i]; // 8방의 위치를 확인

        // 만약 위치가 맵을 벗어나지 않고 방문하지 않았던 곳이면 실행
        if (nr >= 0 && nc >= 0 && nr < row && nc < col && !deepCopyVisited[nr][nc]) {
          if (deepCopyMine[nr][nc] === 10) cnt.current++; // 방문한 곳이 지뢰면 지뢰수를 체크
          arr = [...arr, [nr, nc]]; // 방문했던 곳을 임시 저장
        }
      }

      // 만약 방문했던 곳 전부가 지뢰가 없었다면 모든 곳에 -1을 표시
      if (!cnt.current) {
        for (const [r, c] of arr) {
          deepCopyMine[r][c] = -1;
          deepCopyVisited[r][c] = 1;
        }
        // stack에 방문할 곳을 저장
        deepCopyStack = [...deepCopyStack, ...arr];
      } else deepCopyMine[r][c] = cnt.current; // 만약 지뢰가 하나라도 존재했다면 현재 위치에 지뢰 수를 표시
      helper();
    }
    helper();

    // 수정된 맵 정보를 전역 상태에 저장
    if (checkDone(deepCopyMine)) dispatch(setIsDone()); // 만약 모든 맵을 확인했다면 게임 성공
    if (!checkDone(deepCopyMine)) {
      dispatch(changeMine(deepCopyMine));
      dispatch(stackPush(deepCopyStack));
      dispatch(visitedPush(deepCopyVisited));
    }
  };

  return { checkMine };
}
