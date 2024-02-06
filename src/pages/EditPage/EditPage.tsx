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
import { SubmitHandler, useForm } from 'react-hook-form';
import { handleEmailValidation } from '../../utils/validateForm';

const arrayImages = [IconImage1, IconImage2, IconImage3, IconImage4, IconImage5];

interface dataTypes extends itemTypes {
  boardId: number;
}

interface FormTypes {
  company: string;
  email: string;
  place: string;
}

export const EditPage: React.FC<{}> = () => {
  const params = useParams();
  const [dataItem, setDataItem] = useState<dataTypes>();
  const boards = useSelector(boardsSelect);

  const [activeImage, setActiveImage] = useState(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormTypes>({ mode: 'onBlur' });

  useEffect(() => {
    for (let i = 0; i < boards.length; i++) {
      const item = boards[i].items.find((item) => item.company === params.company);
      if (item) {
        setDataItem({
          ...item,
          boardId: boards[i].id,
        });

        setValue('company', item.company);
        setValue('email', item.email);
        setValue('place', item.place);

        const indexImage = arrayImages.indexOf(item.img);
        setActiveImage(indexImage);
      }
    }
  }, [boards]);

  const onBack = () => {
    navigate('/customers');
  };

  const onSubmit: SubmitHandler<FormTypes> = (data) => {
    const newObject = {
      id: dataItem?.id,
      itemId: dataItem?.itemId,
      date: dataItem?.date,
      price: dataItem?.price,
      title: dataItem?.title,
      place: data.place,
      email: data.email,
      company: data.company,
      img: arrayImages[activeImage],
    };
    dispatch(changeBoardItems({ boardId: dataItem?.boardId, obj: newObject }));
    navigate('/customers');
  };

  return (
    <div>
      <h1 className="title">{`Редактирование ${params.company}`}</h1>
      {dataItem && (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
            <label>
              {errors.company ? (
                <span className={`${styles.labelText} ${styles.errorTetx}`}>
                  {errors.company?.message || 'Ошибка заполения'}
                </span>
              ) : (
                <span className={styles.labelText}>Имя компании</span>
              )}
              <input
                className={`${styles.input} ${errors.company ? styles.errorField : ''}`}
                type="text"
                placeholder="Имя компании"
                {...register('company', {
                  required: 'Заполните поле',
                  minLength: {
                    value: 6,
                    message: 'Поле должно содержать не менее 6 символов',
                  },
                })}
              />
            </label>
            <label>
            {errors.email ? (
                <span className={`${styles.labelText} ${styles.errorTetx}`}>
                  {errors.email?.message || 'Ошибка заполения'}
                </span>
              ) : (
                <span className={styles.labelText}>Почта клиента</span>
              )}
              <input
                className={`${styles.input} ${errors.email ? styles.errorField : ''}`}
                type="text"
                placeholder='Почта клиента'
                {...register('email', { required: "Заполните поле", validate: handleEmailValidation})}
              />
            </label>
            <label>
              {errors.place ? (
                <span className={`${styles.labelText} ${styles.errorTetx}`}>
                  {errors.place?.message || 'Ошибка заполения'}
                </span>
              ) : (
                <span className={styles.labelText}>Откуда клинт</span>
              )}
              <input
                className={`${styles.input} ${errors.place ? styles.errorField : ''}`}
                type="text"
                placeholder="Откуда клинт"
                {...register('place', { required: 'Заполните поле' })}
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
              </div>
            </div>
            <div className={styles.buttons}>
              <button type="button" onClick={onBack} className={styles.btn}>
                Вернуться
              </button>
              <button className={styles.btn}>Сохранить</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
