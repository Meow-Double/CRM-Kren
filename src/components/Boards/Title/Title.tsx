
import { getColorGradient } from "../../../utils/getColorGradient";
import styles from "./Title.module.scss";

type TitleProps = {
  title: string;
  index: number;
  total:number;
};

export const Title: React.FC< TitleProps > = ({ title, index, total }) => {

    const color = getColorGradient(index, total)
  return (
    <h1 className={styles.title} style={{ backgroundColor: `${color.BackgroundColor}` }}>
      {title}
    </h1>
  );
};
