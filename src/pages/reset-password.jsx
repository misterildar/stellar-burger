import React, { useState } from 'react';
import Form from '../components/form/form';
import { useDispatch } from 'react-redux';

import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPasswordUser } from '../services/store/userSlice';

const ResetPassword = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    password: '',
    code: '',
  });

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(resetPasswordUser(form));
  }

  return (
    <Form
      title='Восстановление пароля'
      buttonText='Сохранить'
      question='Вспомнили пароль?'
      linkText='Войти'
      linkPageTo='/login'
      onSubmit={handleSubmit}
      onChange={onChange}
    >
      <PasswordInput
        placeholder={'Введите новый пароль'}
        onChange={onChange}
        value={form.password}
        name={'password'}
        extraClass='mb-2'
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={onChange}
        value={form.code}
        name={'code'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='ml-1'
      />
    </Form>
  );
};

export default ResetPassword;
