/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateArticleAction } from '../../pages/EditArticlePage/EditArticlePage';
import { createArticleAction } from '../../pages/NewArticlePage/NewArticlePage';

import { ArticleType, UpdateArticle } from '../../store/articlesSlice/types';
import classes from './ArticleForm.module.scss';

interface Tag {
  id: string;
  value: string;
}

interface ArticleFormProps {
  article?: ArticleType;
  title: string;
  action: createArticleAction | updateArticleAction;
  tags: Tag[];
  setTag: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const ArticleForm: FC<ArticleFormProps> = ({
  action,
  title,
  tags,
  setTag,
  article,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateArticle>();

  const [newTag, setNewTag] = useState('');

  const onSubmit: SubmitHandler<UpdateArticle> = async (data) => {
    const tagsValues = tags
      .map((tag) => tag.value.trim())
      .filter((value) => value);
    const newArticle = { ...data };

    if (tagsValues.length) newArticle.tagList = tagsValues;
    if (article?.slug) newArticle.slug = article?.slug;

    const {
      type,
      payload: {
        article: { slug },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } = await dispatch(action({ article: newArticle }));

    if (!type.endsWith('rejected'))
      navigate(`/articles/${slug}`, { replace: true });
  };

  const changeTagHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const updatedTags = tags.map((tag) => {
      const tg = tag;
      if (tg.id === e.target.name) tg.value = e.target.value;
      return tg;
    });
    if (e.target.name !== 'First') setTag(updatedTags);
  };

  const handleAddTag = (): void => {
    if (newTag) tags.push({ id: uuidv4(), value: newTag });
    setTag(tags);
    setNewTag('');
  };

  const handleDeleteTag = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { name } = e.target as HTMLButtonElement;
    const updatedTags = tags.filter((tag) => tag.id !== name);
    setTag(updatedTags);
  };

  return (
    <section>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes.title}>{title}</h2>
        <label>
          Title
          <input
            className={`${classes.input} ${
              errors.title && classes['input-error']
            }`}
            {...register('title', {
              required: 'Title is required',
            })}
            type="text"
            defaultValue={article?.title}
            placeholder="Title"
          />
          {errors.title && (
            <div className={classes.error}>{errors.title.message}</div>
          )}
        </label>
        <label>
          Short description
          <input
            className={`${classes.input} ${
              errors.description && classes['input-error']
            }`}
            {...register('description', {
              required: 'Description is required',
            })}
            defaultValue={article?.description}
            type="text"
            placeholder="Description"
          />
          {errors.description && (
            <div className={classes.error}>{errors.description.message}</div>
          )}
        </label>
        <label>
          Text
          <textarea
            className={`${classes.input} ${
              errors.body && classes['input-error']
            }`}
            {...register('body', {
              required: 'Text is required',
            })}
            defaultValue={article?.body}
            placeholder="Text"
          />
          {errors.body && (
            <div className={classes.error}>{errors.body.message}</div>
          )}
        </label>
        <label className={classes.label}>Tag</label>
        {tags.map((tag) => {
          return (
            <div key={tag.id}>
              <input
                className={`${classes.input} ${classes.tag}`}
                type="text"
                name={tag.id}
                value={tag.value}
                onChange={changeTagHandler}
                placeholder="Tag"
              />
              <button
                type="button"
                name={tag.id}
                className={`${classes['tag-button']} ${classes.delete}`}
                onClick={handleDeleteTag}
              >
                Delete
              </button>
            </div>
          );
        })}
        <div key="InputForAddingTag">
          <input
            className={`${classes.input} ${classes.tag}`}
            type="text"
            name="InputForAddingTag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Tag"
          />
          <button
            type="button"
            className={`${classes['tag-button']} ${classes.add}`}
            onClick={handleAddTag}
          >
            Add tag
          </button>
        </div>
        <button type="submit" className={classes.submit}>
          Send
        </button>
      </form>
    </section>
  );
};

export default ArticleForm;
