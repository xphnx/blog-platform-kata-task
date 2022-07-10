import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classes from './UnAuthNav.module.scss';

const UnAuthNav: FC = () => {
  return (
    <nav>
      <Link
        to="/sign-in"
        className={`${classes.signin} ${classes['auth-link']}`}
      >
        Sign In
      </Link>
      <Link
        to="/sign-up"
        className={`${classes.signup} ${classes['auth-link']}`}
      >
        Sign Up
      </Link>
    </nav>
  );
};

export default UnAuthNav;
