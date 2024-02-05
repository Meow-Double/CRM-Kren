import { boardsObject } from "../store/slices/boardsSlice/boardsTypes";

export const getLastIdItem = (boards: boardsObject[]) => {
  if (boards.length) {
    const length = boards.reduce((sum: number, board: boardsObject) => {
      return sum + board.items.length;
    }, 0);
    return length;
  }
  return 0;
};
