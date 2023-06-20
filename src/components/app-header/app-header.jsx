import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './app-header.module.css';
import { AppHeaderContainer } from './app-header-container';

export function AppHeader() {
  return (
    <header className={Styles.header}>
      <div className={Styles.header__box}>
        <AppHeaderContainer text={'Конструктор'} logo={<BurgerIcon />} />
        <AppHeaderContainer text={'Лента заказов'} logo={<ListIcon />} />
      </div>
      <Logo />
      <AppHeaderContainer text={'Личный кабинет'} logo={<ProfileIcon />} />
    </header>
  );
}
