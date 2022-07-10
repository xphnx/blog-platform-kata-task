import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

import classes from './Layout.module.scss';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <div className={classes.container}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
