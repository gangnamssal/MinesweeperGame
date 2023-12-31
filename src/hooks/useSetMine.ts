import { useSelector, useDispatch } from 'react-redux';

import deepCopy from '@helper/deepCopy';
import { RootState } from '@store/store';
import useCheckMine from '@hooks/useCheckMine';
import { changeMine } from '@store/mineSlice/mineSlice';

export default function useSetMine() {
  const dispatch = useDispatch();
  const { checkMine } = useCheckMine();
  const { row, col, mine: MINE } = useSelector((state: RootState) => state.mine);

  const mine = deepCopy(MINE);

  const setMine = (currentRow: number, currentCol: number) => {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        // 내가 클릭한 index를 제외하고 랜덤하게 지뢰를 생성
        if (Math.random() < 0.2 && i !== currentRow && j !== currentCol) mine[i][j] = 10;
      }
    }
    dispatch(changeMine(mine));
    checkMine(mine, currentRow, currentCol); // 생성한 뒤 주변에 지뢰를 검사
  };

  return { setMine };
}
