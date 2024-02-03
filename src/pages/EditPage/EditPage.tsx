import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditPage.module.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { changeBoardItems } from '../../store/slices/boardsSlice/boardsSlice';

import IconImage1 from '../../../public/companyIcon-1.png';
import IconImage2 from '../../../public/companyIcon-2.png';
import IconImage3 from '../../../public/comapnyIcon-3.png';
import IconImage4 from '../../../public/comapnyIcon-4.png';
import IconImage5 from '../../../public/comapnyIcon-5.png';
import { boardsSelect } from '../../store/slices/boardsSlice/boardsSelectors';
import { itemTypes } from '../../store/slices/boardsSlice/boardsTypes';

const arrayImages = [IconImage1, IconImage2, IconImage3, IconImage4, IconImage5];


interface dataTypes extends itemTypes {
  boardId:number;
}


export const EditPage: React.FC<{}> = () => {
  const params = useParams();
  const [data, setData] = useState<dataTypes>();
  const boards = useSelector(boardsSelect);

  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [place, setPlace] = useState("");

  const [activeImage, setActiveImage] = useState(0);

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

        // const indexImage = arrayImages.find(image => image === item.img);
        const indexImage = arrayImages.indexOf(item.img);
        setActiveImage(indexImage);
      }
    }
  }, [boards]);

  const changeCards = () => {
    const newObject = {
      id: data?.id,
      itemId: data?.itemId,
      date: data?.date,
      price: data?.price,
      title: data?.title,
      place,
      email,
      company,
      img:arrayImages[activeImage]
    };
    dispatch(changeBoardItems({ boardId: data?.boardId, obj: newObject }));
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
              <span>Аватарка</span>
              <div className={styles.imageIcons}>
                {arrayImages.map((item, index) => (
                  <img
                    key={item}
                    src={item}
                    alt={`image-${index}`}
                    onClick={() => setActiveImage(index)}
                    className={`${styles.img} ${activeImage === index ? styles.activeImg : ''}`}
                  />
                ))}
                {/* <img className={`${styles.img}`} src={IconImage1} alt="image" />
                <img className={`${styles.img}`} src={IconImage2} alt="image" />
                <img className={`${styles.img}`} src={IconImage3} alt="image" />
                <img className={`${styles.img}`} src={IconImage4} alt="image" />
                <img className={`${styles.img}`} src={IconImage5} alt="image" /> */}
              </div>
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
