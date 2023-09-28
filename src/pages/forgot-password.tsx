import React, { useState, FC, FormEvent, ChangeEvent } from 'react';
import Form from '../components/form/form';
import { routes } from '../utils/constants';
import { useAppDispatch } from '../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordUser } from '../services/store/userSlice';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotPassword: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      dispatch(forgotPasswordUser(value));
      navigate(routes.resetPassword);
    }
  };

  return (
    <Form
      title='Восстановление пароля'
      buttonText='Восстановить'
      question='Вспомнили пароль?'
      linkText='Войти'
      linkPageTo={routes.login}
      onSubmit={handleSubmit}
      nextLinkPageTo=''
    >
      <EmailInput
        onChange={onChange}
        value={value}
        name={'email'}
        isIcon={false}
      />
    </Form>
  );
};

export default ForgotPassword;
