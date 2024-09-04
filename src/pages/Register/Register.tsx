import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import styles from './Register.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrorMessage } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (jwt) {
      navigate('/');
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearRegisterError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    dispatch(
      register({
        email: email.value,
        password: password.value,
        name: name.value,
      })
    );
  };

  return (
    <div className={styles['login']}>
      <Heading>Регистрация</Heading>
      {registerErrorMessage && (
        <div className={styles['error']}>{registerErrorMessage}</div>
      )}
      <form className={styles['form']} onSubmit={submit}>
        <div className={styles['field']}>
          <label htmlFor="email">Ваш email</label>
          <Input id="email" name="email" placeholder="Email" />
        </div>
        <div className={styles['field']}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <div className={styles['field']}>
          <label htmlFor="password">Ваше имя</label>
          <Input id="name" name="name" placeholder="Имя" />
        </div>
        <Button appearance="big">Зарегистрироваться</Button>
      </form>
      <div className={styles['links']}>
        <div className={styles['']}>Есть акканут? </div>
        <Link to="/auth/login">Войти</Link>
      </div>
    </div>
  );
};
