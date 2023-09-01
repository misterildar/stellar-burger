import React, { useState } from 'react';
import Form from '../components/form/form';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/use-auth';
import { useForm } from '../hooks/use-form';

import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Navigate } from 'react-router-dom';
import { routes } from '../utils/constants';
import { resetPasswordUser } from '../services/store/userSlice';

const ResetPassword = () => {
  const dispatch = useDispatch();

  const { values, handleChange } = useForm({
    password: '',
    code: '',
  });

  const { isForgotPasswordRequest } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(resetPasswordUser(values));
  }

  return isForgotPasswordRequest ? (
    <Form
      title='Восстановление пароля'
      buttonText='Сохранить'
      question='Вспомнили пароль?'
      linkText='Войти'
      linkPageTo={routes.login}
      onSubmit={handleSubmit}
    >
      <PasswordInput
        placeholder={'Введите новый пароль'}
        onChange={handleChange}
        value={values.password}
        name={'password'}
        extraClass='mb-2'
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={handleChange}
        value={values.code}
        name={'code'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='ml-1'
      />
    </Form>
  ) : (
    <Navigate to={routes.home} />
  );
};

export default ResetPassword;
