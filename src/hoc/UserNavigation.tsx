import React, { FC } from 'react';
import AuthNav from '../components/AuthNav/AuthNav';
import UnAuthNav from '../components/UnAuthNav/UnAuthNav';
import { useAppSelector } from '../hooks/useAppSelector';

const UserNavigation: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  if (!user) return <UnAuthNav />;
  return <AuthNav />;
};

export default UserNavigation;
