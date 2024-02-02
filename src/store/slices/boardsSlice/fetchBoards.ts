import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import { boardsObject } from "./boardsTypes";


export const fetchAddItem = (boardId: number, newBoard: boardsObject) => {
  axios.patch<boardsObject>(`https://1df99c0c2ae7768d.mokky.dev/items/${boardId}`, newBoard);
};
export const fetchRemoveItem = (boardId: number, newBoard: boardsObject) => {
  axios.patch<boardsObject>(`https://1df99c0c2ae7768d.mokky.dev/items/${boardId}`, newBoard);
};
export const fetchChangeItem = (items: boardsObject[]) => {
  axios.patch<boardsObject>(`https://1df99c0c2ae7768d.mokky.dev/items`, items);
};


export const fetchBoards = createAsyncThunk<boardsObject[]>('boards/fetchBoards', async () => {
    const { data } = await axios.get<boardsObject[]>(
      // `https://658b0e95ba789a96223860cb.mockapi.io/items`,
      `https://1df99c0c2ae7768d.mokky.dev/items`,
    );
    return data;
  });