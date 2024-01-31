import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface userTypes {
  email: null | string;
  token: null | string;
  id: null | string;
}

const initialState: userTypes = {
  email: null,
  token: null,
  id: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<userTypes>) {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    removeUser(state) {
      state.email = null;
      state.id = null;
      state.token = null;
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
