import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from '../components/form/form';
import { loginUser } from '../services/store/userSlice';
import {
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

const Login = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <Form
      title='Вход'
      buttonText='Войти'
      question='Вы — новый пользователь?'
      linkText='Зарегистрироваться'
      nextQuestion='Забыли пароль?'
      nextLinkText='Восстановить пароль'
      linkPageTo='/register'
      nextLinkPageTo='/forgot-password'
      onSubmit={handleSubmit}
    >
      <EmailInput onChange={onChange} value={form.email} name={'email'} />
      <PasswordInput
        onChange={onChange}
        value={form.password}
        name={'password'}
        extraClass='mb-2'
      />
    </Form>
  );
};

export default Login;
