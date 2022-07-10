import {
  NewArticleRequest,
  UpdateArticleRequest,
} from '../store/articlesSlice/types';
import axios from './axios';

const endpoints = {
  fetchPerPage: (offset: number) =>
    axios.get(`/articles?limit=5&offset=${offset}`),
  fetchBySlug: (slug: string) => axios.get(`articles/${slug}`),
  updateArticle: (data: UpdateArticleRequest) =>
    axios.put(`articles/${data.article.slug}`, data),
  createArticle: (data: NewArticleRequest) => axios.post('/articles', data),
  deleteArticle: (slug: string) => axios.delete(`/articles/${slug}`),
  favoriteArticle: (slug: string) => axios.post(`/articles/${slug}/favorite`),
  unFavoriteArticle: (slug: string) =>
    axios.delete(`/articles/${slug}/favorite`),
};

export default endpoints;
