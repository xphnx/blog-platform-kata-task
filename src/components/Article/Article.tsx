import React, { FC } from 'react';

import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArticleType } from '../../store/articlesSlice/types';

import classes from './Article.module.scss';
import { useAppSelector } from '../../hooks/useAppSelector';
import Modal from '../Modal/Modal';
import {
  favoriteArticle,
  makeArticleFavorite,
  unFavoriteArticle,
} from '../../store/articlesSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const Article: FC<ArticleType> = ({
  slug,
  title,
  body,
  tagList,
  author,
  createdAt,
  favoritesCount,
  favorited,
  description,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.user);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { favoritesCount: fCount, favorited: isFavorited }: any =
    useAppSelector((state) => state.articles.entities[slug]);
  const isSinglePage = location.pathname.includes(slug);
  const isOwnArticle = author.username === user?.username;
  const isAuth = !!user;
  const likesCount = isSinglePage ? fCount : favoritesCount;
  const favoritedByMe = isSinglePage ? isFavorited : favorited;

  const header = isSinglePage ? (
    <h2 className={classes.title}>{title}</h2>
  ) : (
    <Link to={`/articles/${slug}`}>
      <h2 className={classes.title}>{title}</h2>
    </Link>
  );

  const articleBody = isSinglePage && (
    <div className={classes.body}>
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  );
  const favoriteClickHandler = async (): Promise<void> => {
    if (isAuth) {
      if (favoritedByMe) {
        const {
          // @ts-ignore: Unreachable code error
          payload: { article },
        } = await dispatch(unFavoriteArticle(slug));
        if (article) dispatch(makeArticleFavorite(article));
      } else {
        const {
          // @ts-ignore: Unreachable code error
          payload: { article },
        } = await dispatch(favoriteArticle(slug));
        if (article) dispatch(makeArticleFavorite(article));
      }
    }
  };

  const likesClass = classNames({
    [classes.likes]: true,
    [classes.liked]: favoritedByMe,
  });

  const descriptionClass = classNames({
    [classes.description]: true,
    [classes.single]: isSinglePage,
  });

  return (
    <article className={classes.article}>
      <header className={classes.header}>
        <div className={classes['article-box']}>
          <div className={classes.top}>
            {header}
            <button
              type="button"
              className={likesClass}
              disabled={!isAuth}
              onClick={favoriteClickHandler}
            >
              {likesCount}
            </button>
          </div>
          <div className={classes.tags}>
            {tagList
              .filter((tag) => tag)
              .map((tag) => (
                <span key={uuidv4()} className={classes.tag}>
                  {tag}
                </span>
              ))}
          </div>
        </div>
        <div className={classes['author-box']}>
          <div className={classes.left}>
            <span className={classes.author}>{author.username}</span>
            <span className={classes.date}>
              {format(new Date(createdAt), 'd MMMM, Y')}
            </span>
          </div>
          <div className={classes.right}>
            <img src={author.image} alt="Avatar" className={classes.avatar} />
          </div>
        </div>
      </header>
      <div className={classes['description-wrapper']}>
        <div className={descriptionClass}>{description}</div>
        {user && isSinglePage && isOwnArticle && (
          <div className={classes.buttons}>
            <Modal>
              <button type="button" className={classes.delete}>
                Delete
              </button>
            </Modal>
            <button
              type="button"
              className={classes.edit}
              onClick={() =>
                navigate(`/articles/${slug}/edit`, { state: slug })
              }
            >
              Edit
            </button>
          </div>
        )}
      </div>
      {articleBody}
    </article>
  );
};

export default Article;
