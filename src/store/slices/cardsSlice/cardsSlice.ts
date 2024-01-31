import { fetchReplaceCard } from './cardsSlice';
import { createSlice, PayloadAction, createAsyncThunk, current } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import axios from 'axios';
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface userTypes {
//   email: null | string;
//   token: null | string;
//   id: null | string;
// }

export const fetchCards = createAsyncThunk('cards/fetchCards', async () => {
  const { data } = await axios.get('http://localhost:3000/items');

  return data;
});

// export const fetchReplaceCard = createAsyncThunk('users/fetchReplaceCard', async (data) => {
//   await axios.patch('https://1df99c0c2ae7768d.mokky.dev/items', data);
// });

const fetchPatchItem = (id, board) => {
  //   axios.patch(`https://1df99c0c2ae7768d.mokky.dev/items/${id}`, board)
};

interface cardsTypes {
  boards: Object[];
  loading: boolean;
  error: boolean;
  currentBoard: any;
  currentItem: any;
  // board: any;
}

const initialState: cardsTypes = {
  boards: [],
  loading: true,
  error: false,
  currentBoard: null,
  currentItem: null,
  // board: null,
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCurrent(state, action) {
      state.currentItem = action.payload.item;
      state.currentBoard = state.boards.find((item) => item.id === action.payload.id);
    },
    addCard(state, action){
      const items = state.boards[action.payload.id - 1].items 
      state.boards[action.payload.id - 1].items = [...items, action.payload.obj]
    },
    changeCards(state, action){
      state.boards = action.payload
    }


    // changeCard(state, action) {
    //   // console.log(current(state).currentItem)
    //   const currentItem = current(state.currentItem);
    //   const currentIndex = current(state).currentBoard.items.indexOf(currentItem);
    //   state.currentBoard.items = state.currentBoard.items.splice(currentIndex, 1);
    //   // state.board = state.boards.find((item) => item.id === action.payload.id);
    //   const board = state.boards.find((item) => item.id === action.payload.id);
    //   const dropIndex = current(board).items.indexOf(action.payload.item);
    //   // state.board.items.splice(dropIndex + 1, 0, state.currentItem);
    //   board.items.splice(dropIndex + 1, 0, current(state).currentItem);
    //   state.boards = state.boards.map((b) => {
    //     if (b.id === current(board).id) {
    //       return board;
    //     }
    //     if (b.id === current(state).currentBoard.id) {
    //       return state.currentBoard;
    //     }
    //     return b;
    //   });
    // },
    //   const currentItem = current(state.currentItem)
    //   const currentIndex = state.currentBoard.items.indexOf(currentItem);
    //   state.currentBoard.items.splice(currentIndex + 1, 1);
    //   // console.log(currentIndex);
    //   // console.log(state.currentBoard.items);
    //   state.board = state.boards.find((item) => item.id === action.payload.id);
    //   const dropIndex = state.board.items.indexOf(action.payload.item);
    //   state.board.items.splice(dropIndex + 1, 0, state.currentItem);
    //   // console.log(state.board.id);
    //   // console.log(state.currentBoard.id);
    //   const newObject = state.boards.map((b) => {
    //     if (b.id === state.board.id) {
    //       fetchPatchItem(b.id, state.board);
    //       return state.board;
    //     }
    //     if (b.id === state.currentBoard.id) {
    //       fetchPatchItem(b.id, state.currentBoard);
    //       return state.currentBoard;
    //     }
    //     return b;
    //   });
    //   state.boards = newObject;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state, action) => {
      state.boards = [];
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.boards = action.payload;
      state.loading = false;
      state.error = false;
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.boards = [];
      state.loading = false;
      state.error = true;
    });
  },
});

// export const selectUser = (state: RootState) => state.user;

export const { setCurrent, addCard, changeCards } = cardsSlice.actions;

export default cardsSlice.reducer;
