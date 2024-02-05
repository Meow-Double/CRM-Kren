import styles from './Form.module.scss';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

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

  const handleEmailValidation = (email: string) => {
    const isValid =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      );
    // const validityChanged = (errors.email && isValid) || (!errors.email && !isValid);
    // if (validityChanged) {
    //   console.log('Fire tracker with', isValid ? 'Valid' : 'Invalid');
    // }
    return isValid;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          type="text"
          placeholder="your email"
          {...register('email', {
            required: 'Заполните поле',
            validate: handleEmailValidation,
          })}
        />
        {errors?.email && <p>{errors?.email?.message || 'Error'}</p>}
        <input
          className={styles.input}
          type="password"
          placeholder="your password"
          {...register('password', {
            required: 'password error',
            minLength: {
              value: 4,
              message: 'error length',
            },
          })}
        />
        {errors?.password && <p>{errors?.password?.message || 'Error'}</p>}
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
