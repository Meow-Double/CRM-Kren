import { useState } from 'react';
import styles from './ListCard.module.scss';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { handleOpenAbout, setCurrentParametrs } from '../../store/slices/aboutSlice/aboutSlice';
import { removeItem } from '../../store/slices/boardsSlice/boardsSlice';

interface ListCardProps {
  title: string;
  price: number;
  company: string;
  date: string;
  id: number;
  boardId: number;
  itemId: number;
  dispatch: any;
}

export const ListCard: React.FC<ListCardProps> = ({
  title,
  price,
  company,
  date,
  id,
  boardId,
  itemId,
  dispatch,
}) => {
  // const [currentBoard, setCurrentBoard] = useState(null);
  // const [currentItem, setCurrentItem] = useState(null);

  // const dragOverHandler = (e) => {
  //   e.preventDefault();
  //   if (e.target.className === styles.item) {
  //     e.target.style.boxShadow = ' 0 10px 3px white';
  //   }
  // };
  // const dragLeaveHandler = (e) => {
  //   e.target.style.boxShadow = 'none';
  // };

  // const dragStartHandler = () => {
  //   setCurrentBoard(board);
  //   setCurrentItem(item);
  // };

  // const dragEndHandler = (e) => {
  //   e.target.style.boxShadow = 'none';
  // };
  // const dragDropHandler = (e, board, item) => {
  //   e.preventDefault();
  //   e.target.style.boxShadow = 'none';
  //   const currentIndex = currentBoard.items.indexOf(currentItem);
  //   currentBoard.items.splice(currentIndex, 1);

  //   const dropIndex = board.items.indexOf(item);
  //   board.items.splice(dropIndex + 1, 0, currentItem);

  //   setBoards(
  //     boards.map((b) => {
  //       if (b.id === board.id) {
  //         return board;
  //       }
  //       if (b.id === currentBoard.id) {
  //         return currentBoard;
  //       }
  //       return b;
  //     }),
  //   );
  // };

  const navigate = useNavigate();

  const handleClick = () => {
    // console.log({ title, price, company, date, id, boardId, itemId});
    // if (confirm()) {
    //   dispatch(removeItem({ boardId, itemId }));
    // }
    dispatch(handleOpenAbout(true));
    dispatch(setCurrentParametrs({ id, boardId, itemId }));
    const querySearch = qs.stringify({
      board: boardId,
      itemId:itemId,
      id:id,
    });
    // dispatch(setOpen({ boolean: true }));
    // dispatch(setId({itemId:itemId, boardId:boardId}))
    navigate(`?${querySearch}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.price}>{price} ₽</span>
      <div className={styles.company}>
        <i>Компания:</i>
        <i>{company}</i>
      </div>
      <p>
        <i className={styles.date}>{date}</i>
      </p>
    </div>
  );
};
