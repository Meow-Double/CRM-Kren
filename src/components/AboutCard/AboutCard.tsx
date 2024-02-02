import styles from './AboutCard.module.scss';
import DeleteIcon from '../../assets/delete.svg?react';
import { handleOpenAbout } from '../../store/slices/aboutSlice/aboutSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { boardsObject, itemTypes } from '../../store/slices/boardsSlice/boardsTypes';
import { boardsSelect } from '../../store/slices/boardsSlice/boardsSelectors';
import { currentParametrsSelect } from '../../store/slices/aboutSlice/aboutSelectors';
import { Message } from './Message/Message';
import { removeItem } from '../../store/slices/boardsSlice/boardsSlice';
import { useNavigate } from 'react-router-dom';

interface AboutCardObject {
  id: number;
  itemId: number;
  title: string;
  price: number;
  company: string;
  date: number;
  stage: string;
  boardId: number;
}

export const AboutCard: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<AboutCardObject | null>(null);

  const parametrs = useSelector(currentParametrsSelect);
  const boards = useSelector(boardsSelect);

  // const navigate = useNavigate();

  useEffect(() => {
    if (parametrs) {
      const currentBoard = boards.find((board: boardsObject) => board.id === parametrs.boardId);

      if (currentBoard) {
        const item = currentBoard.items.find((item: itemTypes) => item.itemId === parametrs.itemId);
        if (item) {
          const obj = {
            ...item,
            stage: currentBoard.title,
            boardId: currentBoard.id,
          };
          setData(obj);
        }
      }
    }
  }, [parametrs]);

  const closeWindow = () => {
    dispatch(handleOpenAbout(false));
  };

  const removeItemFromBoard = () => {
    if (confirm("Вы уверены, что хотите удалить данный объект?")) {
      const obj = {
        boardId: data.boardId,
        itemId: data.itemId,
      };
      dispatch(removeItem(obj));
      dispatch(handleOpenAbout(false))
    }
  };

  return (
    <div className={styles.wrapper} onClick={closeWindow}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {data && (
          <div className={styles.about}>
            <div className={styles.title}>
              <h1>О сделке</h1>
              <button onClick={removeItemFromBoard} className={styles.titleBtn}>
                <DeleteIcon />
              </button>
            </div>
            <dl className={styles.info}>
              <dt>Наименование</dt>
              <dd>{data.title}</dd>
              <dt>Сумма</dt>
              <dd>{data.price} ₽</dd>
              <dt>Статус</dt>
              <dd className={styles.status}>{data.stage}</dd>
              <dt>Клиент</dt>
              <dd>{data.company}</dd>
              <dt>Дата создания</dt>
              <dd>{data.date}</dd>
            </dl>
          </div>
        )}
        {data && <Message id={parametrs ? parametrs.id : null} />}
      </div>
    </div>
  );
};
