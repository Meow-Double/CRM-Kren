import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { aboutParametrsTypes, aboutTypes, currentParametrsTypes, messageTypes } from './aboutTypes';

import { fetchMessage, fetchHandleMessage, fetchCreateMessage } from './fetchAbout';

const initialState: aboutTypes = {
  isOpen: false,
  currentParametrs: null,
  messages: [],
};

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    handleOpenAbout(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    setCurrentParametrs(state, action: PayloadAction<currentParametrsTypes>) {
      state.currentParametrs = action.payload;
    },
    addMessage(state, action: PayloadAction<{ id: number; obj: messageTypes}>) {
      const currentMessage = state.messages.find(
        (item: aboutParametrsTypes) => item.id === action.payload.id,
      );

      if (currentMessage) {
        currentMessage.messages.push(action.payload.obj);

        const messages = state.messages.filter(
          (item: aboutParametrsTypes) => item.id !== currentMessage.id,
        );
        state.messages = [...messages, currentMessage];

        fetchHandleMessage(action.payload.id, currentMessage);
      }
    },
    removeMessage(state, action) {
      const currentMessage = state.messages.find(
        (item: aboutParametrsTypes) => item.id === action.payload.id,
      );

      const newMessages = currentMessage?.messages.filter(
        (item: messageTypes) => item.id !== action.payload.messageId,
      );

      const messages = state.messages.filter(
        (item: aboutParametrsTypes) => item.id !== currentMessage?.id,
      );
      const newMessageObject = { ...currentMessage, messages: newMessages } as aboutParametrsTypes;
      state.messages = [...messages, newMessageObject];

      fetchHandleMessage(action.payload.id, newMessageObject);
    },
    createMessage(state, action) {
      const newMessage = {
        id: action.payload.id,
        itemId: action.payload.itemId,
        boardId: action.payload.boardId,
        messages: [],
      };
      state.messages = [...state.messages, newMessage];

      fetchCreateMessage(newMessage);
    },
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
