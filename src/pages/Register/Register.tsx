import styles from './Register.module.scss';
import { Form } from '../../components';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice/userSlice';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const Register: React.FC = () => {
  const dispatch = useDispatch();

  const nav = useNavigate();

  const handleRegister: (email: string, password: string) => void = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          }),
        );
        nav('/');
      })
      .catch();
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.window}>
          <h1 className={styles.title}>Sign up</h1>
          <Form
            title="Sign up"
            btn={{ name: 'Back', path: '/login' }}
            handleClick={handleRegister}
          />
        </div>
      </div>
    </div>
  );
};
