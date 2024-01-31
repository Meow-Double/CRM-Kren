import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice/userSlice';
import boardsSlice from './slices/boardsSlice/boardsSlice';
// import cardsSlice from './slices/cardsSlice/cardsSlice';
// import aboutSlice from './slices/aboutSlice/aboutSlice';
// import messageSlice from './slices/messageSlice/messageSlice';

export const store = configureStore({
  reducer: {
    user:userSlice,
    boards:boardsSlice
    // cards:cardsSlice,
    // about:aboutSlice,
    // message: messageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
