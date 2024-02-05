import { DragEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { ListCard } from '../';
import { Title } from './Title/Title';
import { Form } from './Form/Form';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getLastIdItem } from '../../utils/getLastIdItem';

import styles from './Boards.module.scss';
import { Loading } from '../../uikit';

import { boardsObject, itemTypes } from '../../store/slices/boardsSlice/boardsTypes';
import { boardsAllSelect, boardsSelect } from '../../store/slices/boardsSlice/boardsSelectors';
import { changeBoards } from '../../store/slices/boardsSlice/boardsSlice';

export const Boards: React.FC<{}> = () => {
  const [boards, setBoards] = useState([]);

  const [currentBoard, setCurrentBoard] = useState<boardsObject>();
  const [currentItem, setCurrentItem] = useState<itemTypes>();
  const lastId = useRef<null | number>(null);
  const boardsItems = useSelector(boardsSelect);
  const { loading, error } = useSelector(boardsAllSelect);

  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchBoards());
  // }, []);

  useEffect(() => {
    if (boardsItems.length) {
      setBoards(JSON.parse(JSON.stringify(boardsItems)));
      lastId.current = getLastIdItem(boardsItems);
    }
  }, [boardsItems]);

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // const dragLeaveHandler = (e) => {
  // };

  const dragStartHandler = (board: boardsObject, item: itemTypes) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  // const dragEndHandler = () => {
  // };

  const dragDropHandler = (e: DragEvent<HTMLDivElement>, board: boardsObject, item: itemTypes) => {
    e.preventDefault();

    const currentIndex = currentBoard?.items.indexOf(currentItem as itemTypes);
    currentBoard?.items.splice(currentIndex as number, 1);

    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem as itemTypes);

    const newBoardItems = board.items.map((item, index) => ({ ...item, itemId: index + 1 }));
    const newBoard = { ...board, items: newBoardItems };

    const newBoards = boards.map((b: boardsObject) => {
      if (b.id === newBoard.id) {
        return newBoard;
      }
      if (b.id === currentBoard?.id) {
        return currentBoard;
      }
      return b;
    });
    dispatch(changeBoards(newBoards));
  };

  const dropCardHandler = (e: DragEvent<HTMLDivElement>, board: boardsObject) => {
    e.preventDefault();
    const currentId = board.items.map((item) => item.id);
    if (!currentId.includes(currentItem ? currentItem.id : 0)) {
      board.items.push(currentItem as itemTypes);
      const currentIndex = currentBoard?.items.indexOf(currentItem as itemTypes);
      currentBoard?.items.splice(currentIndex ? currentIndex : 0, 1);

      const newBoardItems = board.items.map((item, index) => ({ ...item, itemId: index + 1 }));
      const newBoard = { ...board, items: newBoardItems };

      const newBoards = boards.map((b: boardsObject) => {
        if (b.id === newBoard.id) {
          return newBoard;
        }
        if (b.id === currentBoard?.id) {
          return currentBoard;
        }
        return b;
      });
      dispatch(changeBoards(newBoards));
    }
  };

  // if (!boards.length) {
  //   return <div>loading</div>;
  // }
  if (error) {
    return (
      <div className={styles.error}>
        <span>Извините, на сервере произошла ошибка, попробуйте зайти позже 😢</span>
      </div>
    );
  }

  if (loading || !boards.length) {
    return <Loading text="Загрузка данных" />;
  }

  // ------------------------------------------
  return (
    <div className={styles.window}>
      {boards.map((board: boardsObject, index: number) => (
        <div
          key={board.id}
          onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
          onDrop={(e: DragEvent<HTMLDivElement>) => dropCardHandler(e, board)}
          className={styles.item}
        >
          <Title index={index} title={board.title} total={5} />
          <Form boardId={board.id} lengthItems={board.items.length} lastId={lastId.current} />
          {board.items.map((item: itemTypes) => (
            <div
              key={item.id}
              onDragOver={(e: DragEvent<HTMLDivElement>) => dragOverHandler(e)}
              // onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={() => dragStartHandler(board, item)}
              // onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e: DragEvent<HTMLDivElement>) => dragDropHandler(e, board, item)}
              draggable
              className={styles.item}
            >
              <ListCard {...item} boardId={board.id} dispatch={dispatch} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
