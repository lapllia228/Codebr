import {createReducer, on} from '@ngrx/store';
import {Article} from '../models/article.model';
import * as ArticlesActions from './articles.actions';


export interface ArticlesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  searchKeyword: string;
}

export const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
  searchKeyword: ''
};

export const articlesReducer = createReducer(
  initialState,
  on(ArticlesActions.loadArticles, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ArticlesActions.loadArticlesSuccess, (state, { articles }) => ({
    ...state,
    articles,
    loading: false
  })),
  on(ArticlesActions.loadArticlesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(ArticlesActions.setSearchKeyword, (state, { keyword }) => ({
    ...state,
    searchKeyword: keyword
  }))
);
