import { useEffect, useState } from 'react';
import styles from './Form.module.scss';
import ArrowIcon from '../../../assets/arrow-up.svg?react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { addCard } from '../../../store/slices/cardsSlice/cardsSlice';
import { getLastIdItem } from '../../../utils/getLastIdItem';
import { addItem } from '../../../store/slices/boardsSlice/boardsSlice';
import { createMessage } from '../../../store/slices/aboutSlice/aboutSlice';
import dayjs from 'dayjs';

type FormProps = {
  // id: number;
  boardId: number;
  lengthItems: number;
  lastId: number | null;
};

const weekdays = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

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

  // useEffect(() => {
  //   dayjs.extend(updateLocale);

  //   dayjs.updateLocale('en', {
  //     weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  //   });
  // }, []);

  const dispatch = useAppDispatch();

  // console.log(dayjs().get('date'));
  const addNewCard = () => {
    const dateDay = dayjs().get("date");
    const dateMonth = weekdays[dayjs().get("month") - 1];
    const dateYear = dayjs().get("year");
    const date = `${dateDay} ${dateMonth} ${dateYear}`;

    const itemId = lengthItems + 1;
    const id = lastId ? lastId + 1 : 1;
    const obj = {
      title,
      price,
      company,
      email,
      id,
      itemId,
      date,
      place: '-',
      img:"/public/companyIcon-1.png"
    };
    dispatch(addItem({ boardId, obj }));
    dispatch(createMessage({ boardId, itemId, id }));

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
