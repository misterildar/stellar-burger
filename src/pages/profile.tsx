import React, {
  useEffect,
  useState,
  FC,
  FormEvent,
  SyntheticEvent,
} from 'react';
import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../services/store/userSlice';
import { useAppDispatch } from '../hooks/hooks';
import { useAuth } from '../hooks/use-auth';
import { useForm } from '../hooks/use-form';
import styles from './page-style.module.css';
import Form from '../components/form/form';

const ProfileDataChange: FC = () => {
  const user = useAuth();

  const dispatch = useAppDispatch();

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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateUser(values));
    setIsButton(false);
  }

  function back(e: SyntheticEvent<Element, Event>) {
    e.preventDefault();
    setIsButton(false);
    setValues({
      name: user.name,
      email: user.email,
      password: '',
    });
  }

  return (
    <Form onSubmit={handleSubmit} nextLinkPageTo='' linkPageTo=''>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={handleChange}
        icon='EditIcon'
        value={values.name ?? ''}
        name={'name'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass='ml-1'
      />
      <EmailInput
        onChange={handleChange}
        value={values.email ?? ''}
        name={'email'}
        placeholder='Логин'
        isIcon={true}
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password ?? ''}
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
