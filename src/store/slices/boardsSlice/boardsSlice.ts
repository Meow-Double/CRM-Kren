import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { boardsTypes, boardsObject } from './boardsTypes';



export const fetchBoards = createAsyncThunk<boardsObject[]>('boards/fetchBoards', async () => {
  const { data } = await axios.get<boardsObject[]>('https://658b0e95ba789a96223860cb.mockapi.io/items');
  return data;
});


const initialState: boardsTypes = {
  boards: [],
  loading: true,
  error: false,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      state.boards = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action:  PayloadAction<boardsObject[]>) => {
      state.boards = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchBoards.rejected, (state) => {
      state.boards = [];
      state.loading = false;
      state.error = true;
    });
  },
});

// export const selectUser = (state: RootState) => state.user;

export const { } = boardsSlice.actions;

export default boardsSlice.reducer;
