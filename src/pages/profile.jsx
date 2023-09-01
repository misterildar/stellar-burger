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
import { useForm } from '../hooks/use-form';
import styles from './page-style.module.css';
import { updateUser } from '../services/store/userSlice';

const ProfileDataChange = () => {
  const user = useAuth();

  const dispatch = useDispatch();

  const { values, handleChange, setValues } = useForm({
    name: user.name,
    email: user.email,
    password: '',
  });

  const [isButton, setIsButton] = useState(false);

  useEffect(() => {
    const isForm =
      user.name !== values.name ||
      user.email !== values.email ||
      user.password !== values.password;
    setIsButton(isForm);
  }, [values]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUser(values));
    setIsButton(false);
  }

  function back(e) {
    e.preventDefault();
    setIsButton(false);
    setValues({
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
        onChange={handleChange}
        icon='EditIcon'
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
        placeholder='Логин'
        isIcon={true}
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
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
