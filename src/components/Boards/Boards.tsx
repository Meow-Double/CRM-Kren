import { useEffect, useRef, useState } from 'react';
import styles from './Boards.module.scss';
import axios from 'axios';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ListCard } from '../ListCard/ListCard';
import { Title } from './Title/Title';
import { useSelector } from 'react-redux';
import { fetchBoards } from '../../store/slices/boardsSlice/boardsSlice';
import { Form } from './Form/Form';
import { getLastIdItem } from '../../utils/getLastIdItem';

export const Boards: React.FC<{}> = () => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'board 1',
      items: [{ keyId: 1, id: 1, text: 'hello 1' }],
    },
    {
      id: 2,
      title: 'board 2',
      items: [{ keyId: 2, id: 1, text: 'hello 2' }],
    },
    {
      id: 3,
      title: 'board 3',
      items: [{ keyId: 3, id: 1, text: 'hello 3' }],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState([]);
  const [currentItem, setCurrentItem] = useState([]);
  const lastId = useRef(null)
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

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      }),
    );
  };

  const dropCardHandler = (e, board) => {
    e.preventDefault();
    const currentId = board.items.map((item) => item.id);
    if (!currentId.includes(currentItem.id)) {
      board.items.push(currentItem);
      const currentIndex = currentBoard.items.indexOf(currentItem);
      currentBoard.items.splice(currentIndex, 1);

      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return board;
          }
          if (b.id === currentBoard.id) {
            return currentBoard;
          }
          return b;
        }),
      );
    }
  };

  // const items = useSelector(state => state.cards.boards)

  // useEffect(() => {
  //   setBoards(items);
  // },[items])

  const dispatch = useAppDispatch();
  const boardsItems = useSelector((state) => state.boards.boards);

  useEffect(() => {
    dispatch(fetchBoards());
  }, []);
  useEffect(() => {
    // axios.get('https://658b0e95ba789a96223860cb.mockapi.io/items').then((res) => setBoards(res.data));

    if (boardsItems.length) {
      setBoards([...boardsItems]);
      lastId.current = getLastIdItem(boardsItems);
    }

  }, [boardsItems]);

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
          <Form id={board.id} lengthItems={board.items.length} lastId={lastId.current}/>
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
