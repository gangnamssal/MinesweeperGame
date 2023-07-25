import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  mine: number[][];
  isStart: boolean;
  row: number;
  col: number;
  stack: number[][];
  visited: number[][];
  isFindMine: boolean;
  isDone: boolean;
}

const initialState: InitialState = {
  mine: Array.from(Array(8), () => Array(8).fill(0)),
  isStart: false,
  row: 8,
  col: 8,
  stack: [],
  visited: Array.from(Array(8), () => Array(8).fill(0)),
  isFindMine: false,
  isDone: false,
};

interface ChangeDifficultyAction {
  row: number;
  col: number;
}

export interface CustomMap {
  row: number;
  col: number;
}

const mineSlice = createSlice({
  name: 'mine',
  initialState,
  reducers: {
    // 난이도를 변경하면 새로운 맵을 생성
    changeDifficulty(state, action: PayloadAction<ChangeDifficultyAction>) {
      return {
        ...state,
        mine: Array.from(Array(action.payload.row), () => Array(action.payload.col).fill(0)),
        row: action.payload.row,
        col: action.payload.col,
        visited: Array.from(Array(action.payload.row), () => Array(action.payload.col).fill(0)),
      };
    },
    // 변경된 지뢰맵을 저장
    changeMine(state, action: PayloadAction<number[][]>) {
      return { ...state, mine: action.payload, isStart: true };
    },
    // 전역 stack에 저장
    stackPush(state, action: PayloadAction<number[][]>) {
      return { ...state, stack: action.payload };
    },
    // 전역 visited에 저장
    visitedPush(state, action: PayloadAction<number[][]>) {
      return { ...state, visited: action.payload };
    },
    // 지뢰를 클릭했을 때 게임 실패 상태
    findMine(state) {
      return { ...state, isFindMine: true };
    },
    // 맵을 초기화
    resetMine(state, action: PayloadAction<ChangeDifficultyAction>) {
      return {
        ...state,
        mine: Array.from(Array(action.payload.row), () => Array(action.payload.col).fill(0)),
        isStart: false,
        row: action.payload.row,
        col: action.payload.col,
        stack: [],
        visited: Array.from(Array(action.payload.row), () => Array(action.payload.col).fill(0)),
        isFindMine: false,
        isDone: false,
      };
    },
    // 게임을 성공했다는 상태
    setIsDone(state) {
      return { ...state, isDone: true };
    },
    // 커스텀 맵
    setCustomMap(state, action: PayloadAction<CustomMap>) {
      return {
        ...state,
        isStart: false,
        stack: [],
        isFindMine: false,
        isDone: false,
        mine: Array.from(Array(action.payload.row), () => Array(action.payload.col).fill(0)),
        visited: Array.from(Array(action.payload.row), () => Array(action.payload.col).fill(0)),
        row: action.payload.row,
        col: action.payload.col,
      };
    },
  },
});

export const { changeDifficulty, changeMine, stackPush, visitedPush, findMine, resetMine, setIsDone, setCustomMap } =
  mineSlice.actions;
export default mineSlice.reducer;
