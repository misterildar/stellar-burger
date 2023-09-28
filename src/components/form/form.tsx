import React, { ReactNode, FC } from 'react';
import styles from './form.module.css';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

interface IForm {
  title?: string;
  buttonText?: string | boolean;
  onSubmit?: (() => void) | ((e: React.FormEvent<HTMLFormElement>) => void);
  //TODO
  // onChange?: any;
  children?: ReactNode;
  question?: string;
  nextQuestion?: string | boolean;
  nextLinkText?: string | boolean;
  linkText?: string;
  linkPageTo: string;
  nextLinkPageTo: string;
}

const Form: FC<IForm> = ({
  title,
  buttonText = false,
  onSubmit,
  children,
  nextQuestion = false,
  nextLinkText,
  question,
  linkText,
  linkPageTo,
  nextLinkPageTo,
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <p className='text text_type_main-medium'>{title}</p>
      {children}
      {buttonText && (
        <Button htmlType='submit' type='primary' size='medium'>
          {buttonText}
        </Button>
      )}

      <p className='text text_type_main-default text_color_inactive pt-15'>
        {question}
        <Link
          to={linkPageTo}
          className={`text text_type_main-default text_color_inactive pl-3 ${styles.color}`}
        >
          {linkText}
        </Link>
      </p>
      {nextQuestion && (
        <p className='text text_type_main-default text_color_inactive pl-3'>
          {nextQuestion}
          <Link
            to={nextLinkPageTo}
            className={`text text_type_main-default text_color_inactive pl-3 ${styles.color}`}
          >
            {nextLinkText}
          </Link>
        </p>
      )}
    </form>
  );
};

export default Form;
