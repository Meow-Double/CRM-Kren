import { useEffect, useRef, useState } from 'react';
import styles from './Boards.module.scss';
import axios from 'axios';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ListCard } from '../ListCard/ListCard';
import { Title } from './Title/Title';
import { useSelector } from 'react-redux';
import { changeBoards } from '../../store/slices/boardsSlice/boardsSlice';
import { fetchBoards } from '../../store/slices/boardsSlice/fetchBoards';
import { Form } from './Form/Form';
import { getLastIdItem } from '../../utils/getLastIdItem';
import { Loading } from '../../uikit';

export const Boards: React.FC<{}> = () => {
  const [boards, setBoards] = useState([]);

  const [currentBoard, setCurrentBoard] = useState([]);
  const [currentItem, setCurrentItem] = useState([]);
  const lastId = useRef(null);
  const boardsItems = useSelector((state) => state.boards.boards);
  const { loading, error } = useSelector((state) => state.boards);

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

  const dragOverHandler = (e) => {
    e.preventDefault();
    // if (e.target.className === styles.item) {
    //   e.target.style.boxShadow = ' 0 10px 3px white';
    // }
  };
  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none';
  };

  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragEndHandler = (e) => {
    e.target.style.boxShadow = 'none';
  };
  const dragDropHandler = (e, board, item) => {
    e.preventDefault();

    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);

    const newBoardItems = board.items.map((item, index) => ({ ...item, itemId: index + 1 }));
    const newBoard = { ...board, items: newBoardItems };

    const newBoards = boards.map((b) => {
      if (b.id === newBoard.id) {
        return newBoard;
      }
      if (b.id === currentBoard.id) {
        return currentBoard;
      }
      return b;
    });
    dispatch(changeBoards(newBoards));
  };

  const dropCardHandler = (e, board) => {
    e.preventDefault();
    const currentId = board.items.map((item) => item.id);
    if (!currentId.includes(currentItem.id)) {
      board.items.push(currentItem);
      const currentIndex = currentBoard.items.indexOf(currentItem);
      currentBoard.items.splice(currentIndex, 1);

      const newBoardItems = board.items.map((item, index) => ({ ...item, itemId: index + 1 }));
      const newBoard = { ...board, items: newBoardItems };

      const newBoards = boards.map((b) => {
        if (b.id === newBoard.id) {
          return newBoard;
        }
        if (b.id === currentBoard.id) {
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
      {boards.map((board, index) => (
        <div
          key={board.id}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
          className={styles.item}
        >
          <Title index={index} title={board.title} total={5} />
          <Form boardId={board.id} lengthItems={board.items.length} lastId={lastId.current} />
          {board.items.map((item) => (
            <div
              key={item.id}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dragDropHandler(e, board, item)}
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
