import React from 'react';
import styles from './loader.module.css';

const Loader = ({ text }) => {
  return (
    <div className={styles.container}>
      <h1 className='text text_type_main-large p-10'>{text}</h1>
    </div>
  );
};

export default Loader;
