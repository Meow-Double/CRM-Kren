import { RootState } from "../../store";

export const boardsSelect = (state: RootState) => state.boards.boards;
export const boardsAllSelect = (state: RootState) => state.boards;
export const boardsLoadingSelect = (state: RootState) => state.boards.loading;