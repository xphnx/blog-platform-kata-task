import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ArticleForm from '../../components/ArticleForm/ArticleForm';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectArticleBySlug, updateArticle } from '../../store/articlesSlice';
import Notification from '../../components/Notification/Notification';

export type updateArticleAction = typeof updateArticle;

const EditArticlePage: FC = () => {
  const { id: slug } = useParams();
  const article = useAppSelector((state) =>
    selectArticleBySlug(state, slug as string)
  );

  const { error } = useAppSelector((state) => state.articles);

  let tagList = article?.tagList.map((tag) => ({ value: tag, id: uuidv4() }));
  tagList = tagList?.length ? tagList : [];
  const [tags, setTags] = useState(tagList);

  return (
    <>
      {error && <Notification message={error} />}
      <ArticleForm
        article={article}
        action={updateArticle}
        title="Edit article"
        tags={tags}
        setTag={setTags}
      />
    </>
  );
};

export default EditArticlePage;
