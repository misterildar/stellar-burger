import React, { FC } from 'react';
import styles from './loader.module.css';

interface ILoader {
  text: string;
}

const Loader: FC<ILoader> = ({ text }) => {
  return (
    <div className={styles.container}>
      <h1 className='text text_type_main-large p-10'>{text}</h1>
    </div>
  );
};

export default Loader;
