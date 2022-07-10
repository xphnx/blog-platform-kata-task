/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-param-reassign */
import {
  AnyAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import api from '../../api';
import { RootState } from '..';
import {
  ArticlesState,
  ArticleType,
  MultipleArticlesResponse,
  NewArticleRequest,
  SingleArticleResponse,
  UpdateArticleRequest,
} from './types';

export const fetchPerPage = createAsyncThunk<
  MultipleArticlesResponse,
  number,
  { rejectValue: string }
>(
  'articles/fetchPerPage',
  async (offset, { rejectWithValue }): Promise<any> => {
    try {
      const response = await api.articles.fetchPerPage(offset);
      return response.data;
    } catch (e) {
      return rejectWithValue('Произошла ошибка при загрузке статей');
    }
  }
);

export const fetchBySlug = createAsyncThunk<
  SingleArticleResponse,
  string,
  { rejectValue: string }
>('articles/fetchBySlug', async (slug, { rejectWithValue }): Promise<any> => {
  try {
    const response = await api.articles.fetchBySlug(slug);
    return response.data;
  } catch (e) {
    return rejectWithValue('Произошла ошибка при загрузке статьи');
  }
});

export const updateArticle = createAsyncThunk<
  SingleArticleResponse,
  UpdateArticleRequest,
  { rejectValue: string }
>(
  'articles/updateArticle',
  async (article, { rejectWithValue }): Promise<any> => {
    try {
      const response = await api.articles.updateArticle(article);
      return response.data;
    } catch (e) {
      return rejectWithValue('Произошла ошибка при редактировании статьи');
    }
  }
);

export const createArticle = createAsyncThunk<
  SingleArticleResponse,
  NewArticleRequest,
  { rejectValue: string }
>('articles/createNew', async (article, { rejectWithValue }): Promise<any> => {
  try {
    const response = await api.articles.createArticle(article);
    return response.data;
  } catch (e) {
    return rejectWithValue('Произошла ошибка при создании новой статьи');
  }
});

export const deleteArticle = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('articles/deleteOne', async (slug, { rejectWithValue }): Promise<any> => {
  try {
    const response = await api.articles.deleteArticle(slug);
    return response.data;
  } catch (e) {
    return rejectWithValue('Произошла ошибка при удалeнии статьи');
  }
});

export const favoriteArticle = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('articles/favoriteOne', async (slug, { rejectWithValue }): Promise<any> => {
  try {
    const response = await api.articles.favoriteArticle(slug);
    return response.data;
  } catch (e) {
    return rejectWithValue(
      'Произошла ошибка при добавлении статьи в избранные'
    );
  }
});

export const unFavoriteArticle = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('articles/unFavoriteOne', async (slug, { rejectWithValue }): Promise<any> => {
  try {
    const response = await api.articles.unFavoriteArticle(slug);
    return response.data;
  } catch (e) {
    return rejectWithValue('Произошла ошибка при удалении статьи из избранных');
  }
});

const articlesAdapter = createEntityAdapter<ArticleType>({
  selectId: (article) => article.slug,
});

const initialState = articlesAdapter.getInitialState({
  totalArticles: 0,
  isLoading: true,
  error: '',
  currentPage: 1,
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changeCurrentPage(
      state: EntityState<ArticleType> & ArticlesState,
      action: PayloadAction<number>
    ) {
      state.currentPage = action.payload;
    },
    makeArticleFavorite: articlesAdapter.setOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerPage.fulfilled, (state, action) => {
        articlesAdapter.setAll(state, action.payload.articles);
        state.totalArticles = action.payload.articlesCount;
        state.isLoading = false;
      })
      .addCase(fetchBySlug.fulfilled, (state, action) => {
        articlesAdapter.setAll(state, action.payload);
        state.isLoading = false;
      })
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        if (action.payload) state.error = action.payload;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected') && action.type.includes('articles');
}

function isPending(action: AnyAction) {
  return (
    action.type.endsWith('pending') &&
    action.type.includes('articles') &&
    !action.type.includes('favoriteOne') &&
    !action.type.includes('unFavoriteOne')
  );
}

export default articlesSlice.reducer;

export const { changeCurrentPage, makeArticleFavorite } = articlesSlice.actions;

export const {
  selectAll: selectArticlesPerPage,
  selectById: selectArticleBySlug,
} = articlesAdapter.getSelectors<RootState>((state) => state.articles);
