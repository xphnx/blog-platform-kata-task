/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../hooks/useAppDispatch';

import classes from './ArticleForm.module.scss';
// @ts-ignore: Unreachable code error
const ArticleForm = ({ action, title, article }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [tags, setTag] = useState([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    const tgs =
      // @ts-ignore: Unreachable code error
      article?.tagList.map((tag) => ({ id: uuidv4(), value: tag })) || [];
    setTag(tgs);
  }, [article]);
  // @ts-ignore: Unreachable code error
  const onSubmit = async (data) => {
    const tagsValues = tags
      // @ts-ignore: Unreachable code error
      ?.map((tag) => tag.value.trim())
      .filter((value) => value);
    const newArticle = { ...data };

    if (tagsValues?.length) newArticle.tagList = tagsValues;
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
  // @ts-ignore: Unreachable code error
  const changeTagHandler = (e) => {
    const updatedTags = tags?.map((tag) => {
      const tg = tag;
      // @ts-ignore: Unreachable code error
      if (tg.id === e.target.name) tg.value = e.target.value;
      return tg;
    });
    if (e.target.name !== 'First') setTag(updatedTags);
  };

  const handleAddTag = () => {
    // @ts-ignore: Unreachable code error
    if (newTag) tags?.push({ id: uuidv4(), value: newTag });
    setTag(tags);
    setNewTag('');
  };
  // @ts-ignore: Unreachable code error
  const handleDeleteTag = (e) => {
    const { name } = e.target;
    // @ts-ignore: Unreachable code error
    const updatedTags = tags?.filter((tag) => tag.id !== name);
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
            // @ts-ignore: Unreachable code error
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
            // @ts-ignore: Unreachable code error
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
            // @ts-ignore: Unreachable code error
            <div className={classes.error}>{errors.body.message}</div>
          )}
        </label>
        <label className={classes.label}>Tag</label>
        {tags?.map((tag) => {
          return (
            // @ts-ignore: Unreachable code error
            <div key={tag.id}>
              <input
                className={`${classes.input} ${classes.tag}`}
                type="text"
                // @ts-ignore: Unreachable code error
                name={tag.id}
                // @ts-ignore: Unreachable code error
                value={tag.value}
                onChange={changeTagHandler}
                placeholder="Tag"
              />
              <button
                type="button"
                // @ts-ignore: Unreachable code error
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
