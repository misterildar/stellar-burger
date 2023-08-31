import React from 'react';
import styles from './form.module.css';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const Form = ({
  title,
  buttonText = false,
  onSubmit,
  children,
  nextQuestion = false,
  nextLinkText = false,
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
          {nextQuestion}{' '}
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
