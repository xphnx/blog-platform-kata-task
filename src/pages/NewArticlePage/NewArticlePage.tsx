import React, { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import { createArticle } from '../../store/articlesSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import Notification from '../../components/Notification/Notification';

export type createArticleAction = typeof createArticle;

const NewArticlePage: FC = () => {
  const [tags, setTag] = useState([{ id: uuidv4(), value: '' }]);
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
