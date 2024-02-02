import { useNavigate } from 'react-router-dom';
import styles from './Card.module.scss';

type CardProps = {
  image: string;
  email: string;
  company: string;
  place: string;
  buttons?: string;
};

export const Card: React.FC<CardProps> = ({ image, email, company, place, buttons }) => {
  const navigate = useNavigate();

  const toEditPage = () => {
    navigate(`edit/${company}`);
  };

  return (
    <li className={styles.wrapper}>
      {/* <img src={image} alt="" /> */}
      {image === './' ? <span style={{ width:64}}></span> : <img src="companyIcon.png" alt="" />}
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
