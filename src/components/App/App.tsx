import React, { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from '../../hoc/RequireAuth';
import UserAuthorized from '../../hoc/UserAuthorized';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import ArticlesListPage from '../../pages/ArticlesListPage/ArticlesListPage';
import EditArticlePage from '../../pages/EditArticlePage/EditArticlePage';
import EditProfilePage from '../../pages/EditProfilePage/EditProfilePage';
import NewArticlePage from '../../pages/NewArticlePage/NewArticlePage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import SingleArticlePage from '../../pages/SingleArticlePage/SingleArticlePage';
import { getCurrentUser } from '../../store/userSlice';
import { GeneralRequest } from '../../store/userSlice/types';
import Layout from '../Layout/Layout';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getCurrentUser({} as GeneralRequest));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticlesListPage />} />
        <Route path="articles" element={<ArticlesListPage />} />
        <Route path="articles/:id" element={<SingleArticlePage />} />
        <Route
          path="sign-up"
          element={
            <UserAuthorized>
              <SignUpPage />
            </UserAuthorized>
          }
        />
        <Route
          path="sign-in"
          element={
            <UserAuthorized>
              <SignInPage />
            </UserAuthorized>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <EditProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/new-article"
          element={
            <RequireAuth>
              <NewArticlePage />
            </RequireAuth>
          }
        />
        <Route
          path="/articles/:id/edit"
          element={
            <RequireAuth>
              <EditArticlePage />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
