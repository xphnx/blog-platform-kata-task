import React, { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const isAuth = localStorage.getItem('isAuth');

  if (!isAuth) return <Navigate to="/sign-in" state={{ from: location }} />;
  return children;
};

export default RequireAuth;
