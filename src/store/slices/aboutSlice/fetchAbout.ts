import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { aboutParametrsTypes, messageTypes } from './aboutTypes';

export const fetchMessage = createAsyncThunk('about/fetchMessage', async () => {
    const { data } = await axios.get(
      // `https://658b0e95ba789a96223860cb.mockapi.io/items`,
      `https://1df99c0c2ae7768d.mokky.dev/message`,
    );
    return data;
  });
  
  export const fetchHandleMessage = (id: number, obj: aboutParametrsTypes) => {
    axios.patch<aboutParametrsTypes>(`https://1df99c0c2ae7768d.mokky.dev/message/${id}`, obj);
  };
  
  export const fetchCreateMessage = (obj: aboutParametrsTypes) => {
    axios.post<aboutParametrsTypes>(`https://1df99c0c2ae7768d.mokky.dev/message`, obj)
  }
  