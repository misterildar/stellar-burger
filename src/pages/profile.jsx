import React, { useEffect, useState } from 'react';
import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import Form from '../components/form/form';
import { useAuth } from '../hooks/use-auth';
import styles from './page-style.module.css';
import { updateUser } from '../services/store/userSlice';

const ProfileDataChange = () => {
  const user = useAuth();

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    password: '',
  });

  const [isButton, setIsButton] = useState(false);

  useEffect(() => {
    const isForm =
      user.name !== form.name ||
      user.email !== form.email ||
      user.password !== form.password;
    setIsButton(isForm);
  }, [form]);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUser(form));
    setIsButton(false);
  }

  function back(e) {
    e.preventDefault();
    setIsButton(false);
    setForm({
      name: user.name,
      email: user.email,
      password: '',
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onChange}
        icon='EditIcon'
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
        placeholder='Логин'
        isIcon={true}
      />
      <PasswordInput
        onChange={onChange}
        value={form.password}
        name={'password'}
        icon='EditIcon'
        placeholder={'Пароль'}
      />
      {isButton && (
        <div className={styles.page}>
          <Button htmlType='reset' type='primary' size='medium' onClick={back}>
            Отмена
          </Button>
          <Button htmlType='submit' type='primary' size='medium'>
            Сохранить
          </Button>
        </div>
      )}
    </Form>
  );
};

export default ProfileDataChange;
