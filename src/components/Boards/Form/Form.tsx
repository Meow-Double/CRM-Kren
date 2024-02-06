import { useState } from 'react';
import styles from './Form.module.scss';
import ArrowIcon from '../../../assets/arrow-up.svg?react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { addItem } from '../../../store/slices/boardsSlice/boardsSlice';
import { createMessage } from '../../../store/slices/aboutSlice/aboutSlice';
import dayjs from 'dayjs';
import { itemTypes } from '../../../store/slices/boardsSlice/boardsTypes';
import { SubmitHandler, useForm } from 'react-hook-form';
import ImageIcon from '../../../../public/companyIcon-1.png';
import { handleEmailValidation, handlePriceValidation } from '../../../utils/validateForm';

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

interface FormTypes {
  title: string;
  price: string;
  email: string;
  company: string;
}

export const Form: React.FC<FormProps> = ({ boardId, lengthItems, lastId }) => {
  // const [title, setTitle] = useState('');
  // const [price, setPrice] = useState('');
  // const [email, setEmail] = useState('');
  // const [company, setCompany] = useState('');

  const [isOpenForm, setIsOpenForm] = useState(false);

  //   const [data, setData] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormTypes>({ mode: 'onBlur' });

  const handleOpenForm = () => {
    setIsOpenForm((prev) => !prev);
    reset();
  };

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormTypes> = (data: FormTypes) => {
    // create Data
    const dateDay = dayjs().get('date');
    const dateMonth = weekdays[dayjs().get('month') - 1];
    const dateYear = dayjs().get('year');
    const date = `${dateDay} ${dateMonth} ${dateYear}`;

    const itemId = lengthItems + 1;
    const id = lastId ? lastId + 1 : 1;

    const obj: itemTypes = {
      title: data.title,
      price: Number(data.price),
      company: data.company,
      email: data.email,
      id,
      itemId,
      date,
      place: '-',
      img: ImageIcon,
    };
    dispatch(addItem({ boardId, obj }));
    dispatch(createMessage({ boardId, itemId, id }));
    reset();
  };

  return (
    <>
      <button onClick={handleOpenForm} className={`${styles.addButton}`}>
        {isOpenForm ? <ArrowIcon className={styles.arrow} /> : '+'}
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.form} ${isOpenForm ? styles.active : ''}`}
      >
        <input
          className={`${styles.input} ${errors?.title && styles.errorStyles}`}
          type="text"
          placeholder="Наименование"
          {...register('title', { required: true, minLength: 6 })}
        />
        <input
          className={`${styles.input} ${errors?.price && styles.errorStyles}`}
          type="text"
          placeholder="Сумма"
          {...register('price', { required: true, validate: handlePriceValidation })}
        />
        <input
          className={`${styles.input} ${errors?.email && styles.errorStyles}`}
          type="text"
          placeholder="Email"
          {...register('email', { required: true, validate: handleEmailValidation })}
        />
        <input
          className={`${styles.input} ${errors?.company && styles.errorStyles}`}
          type="text"
          placeholder="Компания"
          {...register('company', { required: true, minLength: 6 })}
        />
        <button className={styles.btn}>Добавить</button>
      </form>
    </>
  );
};
