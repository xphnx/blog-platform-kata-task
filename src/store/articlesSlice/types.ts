export type Profile = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type ArticleType = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
};

export type MultipleArticlesResponse = {
  articles: ArticleType[];
  articlesCount: number;
};

export type SingleArticleResponse = {
  article: ArticleType;
};

export type UpdateArticle = {
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
  slug?: string;
};

export type NewArticle = {
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
};

export type UpdateArticleRequest = {
  article: UpdateArticle;
};

export type NewArticleRequest = {
  article: NewArticle;
};

export interface ArticleFormFields {
  slug?: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface ArticlesState {
  totalArticles: number;
  error: string;
  isLoading: boolean;
  currentPage: number;
}
