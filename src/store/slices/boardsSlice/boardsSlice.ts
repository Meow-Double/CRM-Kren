import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boardsTypes, boardsObject, itemTypes } from './boardsTypes';
import { fetchAddItem, fetchChangeItem, fetchRemoveItem, fetchBoards } from './fetchBoards';

const initialState: boardsTypes = {
  boards: [],
  loading: true,
  error: false,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ boardId: number; obj: itemTypes }>) {
      const newBoard = state.boards.find(
        (board) => board.id === action.payload.boardId,
      ) as boardsObject;

      newBoard?.items.push(action.payload.obj);
      const newBoards = state.boards.map((board) =>
        board.id === action.payload.boardId ? newBoard : board,
      );
      state.boards = [...newBoards];

      fetchAddItem(action.payload.boardId, newBoard);
    },

    removeItem(state, action: PayloadAction<{ boardId: number; itemId: number }>) {
      const newBoard = state.boards.find(
        (board) => board.id === action.payload.boardId,
      ) as boardsObject;
        console.log(action)
      const newBoardItems = newBoard.items.filter((item) => item.itemId !== action.payload.itemId);
      const currentBoard = { ...newBoard, items: newBoardItems };
      const newBoards = state.boards.map((board) =>
        board.id === action.payload.boardId ? currentBoard : board,
      );

      state.boards = [...newBoards];
      fetchRemoveItem(action.payload.boardId, currentBoard);
    },

    changeBoards(state, action: PayloadAction<boardsObject[]>) {
      state.boards = action.payload;
      fetchChangeItem(action.payload);
    },

    changeBoardItems(state, action) {
      const newBoard = state.boards.find(
        (board) => board.id === action.payload.boardId,
      ) as boardsObject;

      const newBoardItems = newBoard.items.map((item) =>
        item.id === action.payload.obj.id ? action.payload.obj : item,
      );
      const currentBoard = { ...newBoard, items: newBoardItems };

      const newBoards = state.boards.map((board) =>
        board.id === action.payload.boardId ? currentBoard : board,
      );

      state.boards = [...newBoards];
      
      fetchAddItem(action.payload.boardId, currentBoard);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state) => {
      state.boards = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action: PayloadAction<boardsObject[]>) => {
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

export const { addItem, removeItem, changeBoards, changeBoardItems } = boardsSlice.actions;

export default boardsSlice.reducer;
