import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditPage.module.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { changeBoardItems } from '../../store/slices/boardsSlice/boardsSlice';

import IconImage from '../../../public/companyIcon.png';

export const EditPage: React.FC<{}> = () => {
  const params = useParams();

  const [data, setData] = useState(null);
  const boards = useSelector((state) => state.boards.boards);

  const [company, setCompany] = useState();
  const [email, setEmail] = useState();
  const [place, setPlace] = useState();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    for (let i = 0; i < boards.length; i++) {
      const item = boards[i].items.find((item) => item.company === params.company);
      if (item) {
        setData({
          ...item,
          boardId: boards[i].id,
        });
        setCompany(item.company);
        setEmail(item.email);
        setPlace(item.place);
      }
    }
  }, [boards]);

  const changeCards = () => {
    const newObject = {
      id: data.id,
      itemId: data.itemId,
      date: data.date,
      price: data.price,
      title: data.title,
      place,
      email,
      company,
    };
    dispatch(changeBoardItems({ boardId: data.boardId, obj: newObject }));
    navigate('/customers');
  };

  const onBack = () => {
    navigate('/customers');
  };

  return (
    <div>
      <h1 className="title">{`Редактирование ${params.company}`}</h1>
      {data && (
        <>
          <div className={styles.wrapper}>
            <label>
              <span className={styles.labelText}>Имя компании</span>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={styles.input}
                type="text"
              />
            </label>
            <label>
              <span className={styles.labelText}>Почта клиента</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                type="text"
              />
            </label>
            <label>
              <span className={styles.labelText}>Откуда клинт</span>
              <input
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className={styles.input}
                type="text"
              />
            </label>
            <div className={styles.imageBlock}>
              <img className={styles.img} src={IconImage} alt="image" />
              <span>Аватарка</span>
            </div>
          </div>
          <div className={styles.buttons}>
            <button onClick={onBack} className={styles.btn}>
              Вернуться
            </button>
            <button onClick={changeCards} className={styles.btn}>
              Сохранить
            </button>
          </div>
        </>
      )}
    </div>
  );
};
