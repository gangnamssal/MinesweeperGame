import { configureStore } from '@reduxjs/toolkit';

import mineSlice from '@store/mineSlice';
import timeSlice from '@store/timeSlice';

export const store = configureStore({
  reducer: {
    mine: mineSlice,
    time: timeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
