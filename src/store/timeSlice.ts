import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  minute: number;
  second: number;
}

export const initialState: InitialState = {
  minute: 0,
  second: 0,
};

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    setMinute(state, action: PayloadAction<number>) {
      return { ...state, minute: action.payload };
    },
    setSecond(state, action: PayloadAction<number>) {
      return { ...state, second: action.payload };
    },
  },
});

export const { setMinute, setSecond } = timeSlice.actions;
export default timeSlice.reducer;
