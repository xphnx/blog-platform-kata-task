import React, { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppSelector';

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);

  if (!user) return <Navigate to="/sign-in" state={{ from: location }} />;
  return children;
};

export default RequireAuth;
