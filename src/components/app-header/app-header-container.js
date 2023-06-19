import React from 'react';
import styles from './app-header-container.module.css'


export function AppHeaderContainer({ text, logo, styles }) {
  return (
    <div className={`styles.header__container ${styles}`}>
      <div>{logo}</div>
      <p className={`${styles} styles.header__container_text`}>{text}</p>
    </div>
  )
}