import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice/userSlice';
import boardsSlice from './slices/boardsSlice/boardsSlice';
import aboutSlice from './slices/aboutSlice/aboutSlice';


export const store = configureStore({
  reducer: {
    user:userSlice,
    boards:boardsSlice,
    about: aboutSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
