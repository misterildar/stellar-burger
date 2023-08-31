import React from 'react';
import { useDispatch } from 'react-redux';
import Form from '../components/form/form';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordUser } from '../services/store/userSlice';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [value, setValue] = React.useState('');

  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      dispatch(forgotPasswordUser(value));
      navigate('/reset-password');
    }
  };

  return (
    <Form
      title='Восстановление пароля'
      buttonText='Восстановить'
      question='Вспомнили пароль?'
      linkText='Войти'
      linkPageTo='/login'
      onSubmit={handleSubmit}
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
