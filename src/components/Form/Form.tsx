import styles from './Form.module.scss';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorIcon from '../../assets/error-icon.svg?react';
import { handleEmailValidation } from '../../utils/validateForm';

type FormProps = {
  title: string;
  btn: BtnField;
  handleClick: (email: string, password: string) => void;
};

type BtnField = {
  name: string;
  path: string;
};

interface FormTypes {
  email: string;
  password: string | number;
}

export const Form: React.FC<FormProps> = ({ title, btn, handleClick }: any) => {
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');

  const nav = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>({ mode: 'onBlur' });
  // const { errors } = useFormState();

  const onSubmit: SubmitHandler<FormTypes> = (data) => {
    handleClick(data.email, data.password);
    reset();
  };

  // const handleEmailValidation = (email: string) => {
  //   const isValid =
  //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
  //       email,
  //     );
  //   return isValid;
  // };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors?.email && (
          <div className={styles.errorBlock}>
            <ErrorIcon />
            <p className={styles.errorText}>{errors?.email?.message || 'Неправильный email'}</p>
          </div>
        )}
        <input
          className={styles.input}
          type="text"
          placeholder="your email"
          {...register('email', {
            required: 'Заполните поле',
            validate: handleEmailValidation,
          })}
        />
        {errors?.password && (
          <div className={styles.errorBlock}>
            <ErrorIcon />
            <p className={styles.errorText}>{errors?.password?.message || 'Error'}</p>
          </div>
        )}
        <input
          className={styles.input}
          type="password"
          placeholder="your password"
          {...register('password', {
            required: 'Заполните поле',
            minLength: {
              value: 4,
              message: 'Пароль содержит меньше 4 символов',
            },
          })}
        />

        <div className={styles.btnBlock}>
          <button
            type="submit"
            className={styles.btn}
            // onClick={() => handleClick(email, password)}
          >
            {title}
          </button>
          <button type="button" className={styles.btn} onClick={() => nav(btn.path)}>
            {btn.name}
          </button>
        </div>
      </form>
    </>
  );
};
