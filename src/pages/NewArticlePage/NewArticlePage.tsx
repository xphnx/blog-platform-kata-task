import React, { FC, useState } from 'react';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import { createArticle } from '../../store/articlesSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import Notification from '../../components/Notification/Notification';

export type createArticleAction = typeof createArticle;

const NewArticlePage: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tags, setTag] = useState<any>([]);
  const { error } = useAppSelector((state) => state.articles);
  return (
    <>
      {error && <Notification message={error} />}
      <ArticleForm
        action={createArticle}
        title="Create New Article"
        tags={tags}
        setTag={setTag}
      />
    </>
  );
};

export default NewArticlePage;
