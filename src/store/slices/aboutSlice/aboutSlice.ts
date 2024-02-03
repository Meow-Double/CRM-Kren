import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import axios from 'axios';
// import type { PayloadAction } from '@reduxjs/toolkit'

export const fetchMessage = createAsyncThunk('about/fetchMessage', async () => {
  const { data } = await axios.get(
    // `https://658b0e95ba789a96223860cb.mockapi.io/items`,
    `https://1df99c0c2ae7768d.mokky.dev/message`,
  );
  return data;
});

const fetchHandleMessage = (id: number, obj: messageTypes) => {
  axios.patch<aboutParametrsTypes>(`https://1df99c0c2ae7768d.mokky.dev/message/${id}`, obj);
};

const fetchCreateMessage = (obj: aboutParametrsTypes) => {
  axios.post<aboutParametrsTypes>(`https://1df99c0c2ae7768d.mokky.dev/message`, obj)
}

export interface aboutTypes {
  isOpen: boolean;
  currentParametrs: null | aboutParametrsTypes;
  messages: any;
}

export type messageTypes = {
  id: number;
  text: string;
};

type aboutParametrsTypes = {
  id: number;
  boardId: number;
  itemId: number;
  messages: Array<messageTypes> | [];
};

const initialState: aboutTypes = {
  isOpen: false,
  currentParametrs: null,
  messages: [],
};

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    handleOpenAbout(state, action) {
      state.isOpen = action.payload;
    },
    setCurrentParametrs(state, action) {
      state.currentParametrs = action.payload;
    },
    addMessage(state, action) {
      const currentMessage = state.messages.find((item) => item.id === action.payload.id);

      if (currentMessage) {
        currentMessage.messages.push(action.payload.obj);

        const messages = state.messages.filter((item) => item.id !== currentMessage.id);
        state.messages = [...messages, currentMessage];

        fetchHandleMessage(action.payload.id, currentMessage);
      } 
    },
    removeMessage(state, action) {
      const currentMessage = state.messages.find((item) => item.id === action.payload.id);

      const newMessages = currentMessage.messages.filter(
        (item) => item.id !== action.payload.messageId,
      );

      const messages = state.messages.filter((item) => item.id !== currentMessage.id);
      const newMwssageObject = { ...currentMessage, messages: newMessages };
      state.messages = [...messages, newMwssageObject];

      fetchHandleMessage(action.payload.id, newMwssageObject);
    },
    createMessage(state, action){
      const newMessage = {
        id:action.payload.id,
        itemId:action.payload.itemId,
        boardId:action.payload.boardId,
        messages:[]
      }
      state.messages = [...state.messages, newMessage]

      fetchCreateMessage(newMessage);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessage.pending, (state) => {
      state.messages = [];
    });
    builder.addCase(fetchMessage.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
    builder.addCase(fetchMessage.rejected, (state) => {
      state.messages = [];
    });
  },
});

export const { handleOpenAbout, setCurrentParametrs, addMessage, removeMessage, createMessage } =
  aboutSlice.actions;

export default aboutSlice.reducer;
