import { useNavigate } from 'react-router-dom';
import styles from './Card.module.scss';

type CardProps = {
  img: string;
  email: string;
  company: string;
  place: string;
  buttons?: string;
};

export const Card: React.FC<CardProps> = ({ email, company, place, buttons, img }) => {
  const navigate = useNavigate();

  const toEditPage = () => {
    navigate(`edit/${company}`);
  };

  return (
    <li className={styles.wrapper}>
      {/* <img src={image} alt="" /> */}
      <img src={img} alt="image avatar" />
      <h4>{company}</h4>
      <span>{email ? email : '-'}</span>
      <span>{place ? place : '-'}</span>
      {buttons ? (
        <span className={styles.buttonsOption}>{buttons}</span>
      ) : (
        <button onClick={toEditPage}>Редактировать</button>
      )}
    </li>
  );
};
