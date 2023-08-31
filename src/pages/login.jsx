import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from '../components/form/form';
import { routes } from '../utils/constants';
import { useForm } from '../hooks/use-form';
import { loginUser } from '../services/store/userSlice';
import {
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

const Login = () => {
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(values));
  };

  return (
    <Form
      title='Вход'
      buttonText='Войти'
      question='Вы — новый пользователь?'
      linkText='Зарегистрироваться'
      nextQuestion='Забыли пароль?'
      nextLinkText='Восстановить пароль'
      linkPageTo={routes.register}
      nextLinkPageTo={routes.forgotPassword}
      onSubmit={handleSubmit}
    >
      <EmailInput onChange={handleChange} value={values.email} name={'email'} />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={'password'}
        extraClass='mb-2'
      />
    </Form>
  );
};

export default Login;
