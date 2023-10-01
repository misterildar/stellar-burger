import React, { FC, FormEvent } from 'react';
import Form from '../components/form/form';
import { useAuth } from '../hooks/use-auth';
import { useForm } from '../hooks/use-form';
import { Navigate } from 'react-router-dom';
import { routes } from '../utils/constants';
import { useAppDispatch } from '../hooks/hooks';
import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPasswordUser } from '../services/store/userSlice';

const ResetPassword: FC = () => {
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm({
    password: '',
    code: '',
  });

  const { isForgotPasswordRequest } = useAuth();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
      nextLinkPageTo=''
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
