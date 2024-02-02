import styles from './Loading.module.scss';

type LoadingProps = {
text:string
}

export const Loading: React.FC<LoadingProps> = ({text}) => {
  return (
    <div className={styles.window}>
        <ul className={styles.items}>
          <li className={`${styles.item} ${styles.item1}`} ></li>
          <li className={`${styles.item} ${styles.item2}`} ></li>
          <li className={`${styles.item} ${styles.item3}`} ></li>
        </ul>
        <h4 className={styles.title}>{text}</h4>
    </div>
  );
};
