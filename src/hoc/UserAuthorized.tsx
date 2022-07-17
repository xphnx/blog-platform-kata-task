import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';

interface UserAuthorizedProps {
  children: JSX.Element;
}

const UserAuthorized: FC<UserAuthorizedProps> = ({ children }) => {
  //   const { user } = useAppSelector((state) => state.user);
  const isAuth = localStorage.getItem('isAuth');

  if (isAuth) return <Navigate to="/" replace />;
  return children;
};

export default UserAuthorized;
