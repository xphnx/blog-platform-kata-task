/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react';
import { fetchBySlug } from '../store/articlesSlice';
import { getCurrentUser } from '../store/userSlice';
import { useAppDispatch } from './useAppDispatch';

function useArticleAndUser(slug) {
  const dispatch = useAppDispatch();
  const [article, setArticle] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    async function someFunction() {
      const { payload: a } = await dispatch(fetchBySlug(slug));
      const { payload: u } = await dispatch(getCurrentUser());
      setArticle(a.article);
      setUser(u.user);
    }
    someFunction();
  }, []);

  return [article, user];
}

export default useArticleAndUser;
