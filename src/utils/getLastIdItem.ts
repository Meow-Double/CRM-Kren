export const getLastIdItem = (boards) => {
  if (boards.length) {
    const length = boards.reduce((sum, board) => {
      return sum + board.items.length;
    }, 0);
    return length;
  }
  return 0;
};
