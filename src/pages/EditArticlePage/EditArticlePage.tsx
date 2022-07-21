/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchBySlug, updateArticle } from '../../store/articlesSlice';
import Notification from '../../components/Notification/Notification';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const EditArticlePage = () => {
  const { id: slug } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    async function getArticle() {
      // @ts-ignore: Unreachable code error
      const { payload } = await dispatch(fetchBySlug(slug));
      setArticle(payload.article);
    }
    getArticle();
  }, [slug]);

  useEffect(() => {
    if (user && article) {
      // @ts-ignore: Unreachable code error
      if (user.username !== article.author.username) {
        navigate('/', { replace: true });
      } else {
        setPageLoading(false);
      }
    }
  }, [user, article]);

  const { error } = useAppSelector((state) => state.articles);

  return (
    <>
      {error && <Notification message={error} />}
      {!pageLoading && (
        <ArticleForm
          article={article}
          action={updateArticle}
          title="Edit article"
        />
      )}
    </>
  );
};

export default EditArticlePage;
