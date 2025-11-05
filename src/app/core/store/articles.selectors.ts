import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ArticlesState} from './articles.reducer';
import {SearchUtil} from '../../shared/utils/search.util';

export const selectArticlesState = createFeatureSelector<ArticlesState>('articles');

export const selectAllArticles = createSelector(
  selectArticlesState,
  state => state.articles
);

export const selectLoading = createSelector(
  selectArticlesState,
  state => state.loading
);

export const selectError = createSelector(
  selectArticlesState,
  state => state.error
);

export const selectSearchKeyword = createSelector(
  selectArticlesState,
  state => state.searchKeyword
);

export const selectFilteredArticles = createSelector(
  selectAllArticles,
  selectSearchKeyword,
  (articles, keyword) => SearchUtil.searchArticles(articles, keyword)
);
