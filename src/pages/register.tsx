import React, { FC, FormEvent } from 'react';
import Form from '../components/form/form';
import { routes } from '../utils/constants';
import { useAppDispatch } from '../hooks/hooks';
import { useForm } from '../hooks/use-form';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/store/userSlice';
import {
  Input,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

const Register: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(registerUser(values));
    navigate(routes.login);
  }

  return (
    <Form
      title='Регистрация'
      buttonText='Зарегистрироваться'
      question='Уже зарегистрированы?'
      linkText='Войти'
      linkPageTo={routes.login}
      onSubmit={handleSubmit}
      nextLinkPageTo=''
    >
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChange}
        value={values.name}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='ml-1'
      />

      <EmailInput
        onChange={handleChange}
        value={values.email}
        name={'email'}
        isIcon={false}
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={'password'}
        extraClass='mb-2'
      />
    </Form>
  );
};

export default Register;
