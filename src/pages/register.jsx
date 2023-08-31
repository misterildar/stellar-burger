import React, { useState } from 'react';
import Form from '../components/form/form';
import { useDispatch } from 'react-redux';
import { routes } from '../utils/constants';
import { useForm } from '../hooks/use-form';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/store/userSlice';
import {
  Input,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

const Register = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  });

  function handleSubmit(e) {
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
      onChange={handleChange}
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
