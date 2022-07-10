import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import classes from './AuthNav.module.scss';
import logo from '../../img/avatar.png';
import { useAppSelector } from '../../hooks/useAppSelector';
import { logOut } from '../../store/userSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const AuthNav: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const avatar = !user?.image ? logo : user.image;
  const handleLogout = (): AnyAction => dispatch(logOut());
  return (
    <nav className={classes.nav}>
      <Link to="/new-article" className={classes.create}>
        Create Article
      </Link>
      <Link to="/profile">
        <div className={classes.profile}>
          <span className={classes.username}>{user?.username}</span>
          <div className={classes.avatar}>
            <img src={avatar} alt="Avatar" />
          </div>
        </div>
      </Link>
      <Link
        to="/"
        onClick={handleLogout}
        className={`${classes.logout} ${classes['auth-link']}`}
      >
        Log Out
      </Link>
    </nav>
  );
};

export default AuthNav;
