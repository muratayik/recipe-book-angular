import { createSelector } from '@ngrx/store';
import * as fromApp from '../state';
import * as fromCategory from './category.reducer';

const selectCategory = (state: fromApp.AppState) => state.category;

export const selectCategoryList = createSelector(
  selectCategory,
  (state: fromCategory.State) => state.categories
);

export const selectCategoriesFetched = createSelector(
  selectCategory,
  (state: fromCategory.State) => state.categoriesFetched
);
