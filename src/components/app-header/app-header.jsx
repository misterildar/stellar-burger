import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './app-header.module.css';

export function AppHeader() {
  return (
    <header className={Styles.header}>
      <div className={Styles.header__box}>
        <div className={Styles.header__container}>
          <BurgerIcon />
          <p>Конструктор</p>
        </div>
        <div className={Styles.header__container}>
          <ListIcon />
          <p>Лента заказов</p>
        </div>
      </div>
      <Logo />
      <div className={Styles.header__container}>
        <ProfileIcon />
        <p>Личный кабинет</p>
      </div>
    </header>
  );
}

// Создать папку техт
