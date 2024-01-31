import { useState } from 'react';
import styles from './Form.module.scss';
import { useNavigate } from 'react-router-dom';

type FormProps = {
  title:string;
  btn:BtnField;
  handleClick: (email:string, password:string) => void
}

type BtnField = {
  name:string;
  path:string
}

export const Form: React.FC<FormProps> = ({ title, btn, handleClick }: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const nav = useNavigate();

  return (
    <>
      <div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          type="email"
          placeholder="your email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          type="password"
          placeholder="your password"
        />
      </div>
      <div className={styles.btnBlock}>
        <button className={styles.btn} onClick={() => handleClick(email, password)}>
          {title}
        </button>
        <button className={styles.btn} onClick={() => nav(btn.path)}>
          {btn.name}
        </button>
      </div>
    </>
  );
};
