import React, { useState } from 'react';
import Form from '../components/form/form';
import { useDispatch } from 'react-redux';
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

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(registerUser(form));
    navigate('/login');
  }

  return (
    <Form
      title='Регистрация'
      buttonText='Зарегистрироваться'
      question='Уже зарегистрированы?'
      linkText='Войти'
      linkPageTo='/login'
      onSubmit={handleSubmit}
      onChange={onChange}
    >
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onChange}
        value={form.name}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='ml-1'
      />

      <EmailInput
        onChange={onChange}
        value={form.email}
        name={'email'}
        isIcon={false}
      />
      <PasswordInput
        onChange={onChange}
        value={form.password}
        name={'password'}
        extraClass='mb-2'
      />
    </Form>
  );
};

export default Register;
