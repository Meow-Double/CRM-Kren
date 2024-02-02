import { useState } from 'react';
import styles from './Form.module.scss';
import ArrowIcon from '../../../assets/arrow-up.svg?react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { addCard } from '../../../store/slices/cardsSlice/cardsSlice';
import { getLastIdItem } from '../../../utils/getLastIdItem';
import { addItem } from '../../../store/slices/boardsSlice/boardsSlice';
import { createMessage } from '../../../store/slices/aboutSlice/aboutSlice';

type FormProps = {
  // id: number;
  boardId: number;
  lengthItems: number;
  lastId: number | null;
};

export const Form: React.FC<FormProps> = ({ boardId, lengthItems, lastId }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  const [isOpenForm, setIsOpenForm] = useState(false);

  //   const [data, setData] = useState([]);

  const handleOpenForm = () => {
    setIsOpenForm((prev) => !prev);
  };

  const dispatch = useAppDispatch();

  const addNewCard = () => {
    const itemId = lengthItems + 1;
    const id = lastId ? lastId + 1 : 1;
    const obj = {
      title,
      price,
      company,
      email,
      id,
      itemId,
      date: `${new Date()}`,
      place: '-',
    };
    dispatch(addItem({ boardId, obj }));
    dispatch(createMessage({ boardId, itemId, id }));
    // dispatch(addCard({ id, obj }));
    console.log(obj);

    setTitle('');
    setPrice('');
    setEmail('');
    setCompany('');
  };

  return (
    <>
      <button onClick={handleOpenForm} className={`${styles.addButton}`}>
        {isOpenForm ? <ArrowIcon className={styles.arrow} /> : '+'}
      </button>
      <div className={`${styles.form} ${isOpenForm ? styles.active : ''}`}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Наименование"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Сумма"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Email"
        />
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={styles.input}
          type="text"
          placeholder="Компания"
        />
        <button onClick={addNewCard} className={styles.btn}>
          Добавить
        </button>
      </div>
    </>
  );
};
