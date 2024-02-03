import { RootState } from "../../store";

export const boardsSelect = (state: RootState) => state.boards.boards;
export const boardsAllSelect = (state: RootState) => state.boards;