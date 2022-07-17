import React, { FC, useEffect } from 'react';
import { Pagination } from 'antd';
import Article from '../../components/Article/Article';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  changeCurrentPage,
  fetchPerPage,
  selectArticlesPerPage,
} from '../../store/articlesSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import Loader from '../../components/Loader/Loader';
import Notification from '../../components/Notification/Notification';

const ArticlesListPage: FC = () => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.articles);
  const articles = useAppSelector(selectArticlesPerPage);
  const { isLoading, totalArticles, error } = useAppSelector(
    (store) => store.articles
  );

  useEffect(() => {
    dispatch(fetchPerPage(currentPage * 5 - 5));
  }, [dispatch, currentPage]);

  const handleChangePage = (page: number): void =>
    dispatch(changeCurrentPage(page));

  const isThereNoArticles = !!articles.length;

  return (
    <section>
      {!isLoading && !error && !isThereNoArticles && (
        <Notification message="Не загружено ни одной статьи!" />
      )}
      {error && <Notification message={error} />}
      {isLoading ? (
        <Loader size="large" />
      ) : (
        <>
          {articles.map((article) => (
            <Article key={article.slug} {...article} />
          ))}
          {!error && isThereNoArticles && (
            <Pagination
              current={currentPage}
              size="small"
              total={totalArticles}
              pageSize={5}
              onChange={handleChangePage}
              showSizeChanger={false}
            />
          )}
        </>
      )}
    </section>
  );
};

export default ArticlesListPage;
