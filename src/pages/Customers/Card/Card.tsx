import { useNavigate } from "react-router-dom";
import styles from "./Card.module.scss"

type CardProps = {
    image:string,
    email:string,
    company:string,
    place:string
}

export const Card: React.FC<CardProps> = ({image, email, company, place}) => {
    
    const navigate = useNavigate();

    const toEditPage = () => {
        navigate(`edit/${company}`)
    }

  return (
    <li className={styles.wrapper} >
      {/* <img src={image} alt="" /> */}
      <img src="companyIcon.png" alt="" />
      <h4>{company}</h4>
      <span>{email ? email : "-"}</span>
      <span>{place ? place : "-"}</span>
      <button onClick={toEditPage}>Редактировать</button>
    </li>
  );
};
