import { Form } from '../../components';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/slices/userSlice/userSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export const Login: React.FC = () => {

  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const handleLogin: (email:string, password:string) => void = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          }),
        );
        nav('/');
      }).catch(error => alert(error))
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.window}>
          <h1 className={styles.title}>Login</h1>
          <Form
            title="Login"
            btn={{ name: 'Sign up', path: '/register' }}
            handleClick={handleLogin}
          />
        </div>
      </div>
    </div>
  );
};
