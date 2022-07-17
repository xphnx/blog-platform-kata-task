import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface UserAuthorizedProps {
  children: JSX.Element;
}

const UserAuthorized: FC<UserAuthorizedProps> = ({ children }) => {
  const isAuth = localStorage.getItem('isAuth');

  if (isAuth) return <Navigate to="/" replace />;
  return children;
};

export default UserAuthorized;
