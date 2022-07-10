/* eslint-disable @typescript-eslint/no-shadow */
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Article from '../../components/Article/Article';
import { fetchBySlug } from '../../store/articlesSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import Loader from '../../components/Loader/Loader';
import Notification from '../../components/Notification/Notification';
import { ArticleType } from '../../store/articlesSlice/types';

const SingleArticlePage: FC = () => {
  const dispatch = useAppDispatch();
  const [article, setArticle] = useState();
  const { isLoading, error } = useAppSelector((store) => store.articles);
  const { id: slug } = useParams();

  useEffect(() => {
    (async () => {
      const {
        payload: { article },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } = await dispatch(fetchBySlug(slug as string));
      setArticle(article);
    })();
  }, [dispatch, slug]);

  return (
    <section>
      {error && <Notification message={error} />}
      {isLoading ? (
        <Loader size="large" />
      ) : (
        article && <Article {...(article as ArticleType)} />
      )}
    </section>
  );
};

export default SingleArticlePage;
