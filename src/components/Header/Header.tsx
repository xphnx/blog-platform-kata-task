import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import classes from './Header.module.scss';
import { changeCurrentPage } from '../../store/articlesSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import UserNavigation from '../../hoc/UserNavigation';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const clearCurrentPage = (): AnyAction => dispatch(changeCurrentPage(1));

  return (
    <header className={classes.header}>
      <div className={classes['header-container']}>
        <Link to="/" style={{ color: 'black' }} onClick={clearCurrentPage}>
          Realworld Blog
        </Link>
        <UserNavigation />
      </div>
    </header>
  );
};

export default Header;
