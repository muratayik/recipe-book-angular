import { createReducer, on } from '@ngrx/store';

import {
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
} from './category.actions';
import { Category } from 'src/app/category/category.model';

export interface State {
  categoriesFetched: boolean;
  categories: Category[];
  error: string;
}

const initialState: State = {
  categoriesFetched: false,
  categories: [],
  error: '',
};

export const categoryReducer = createReducer(
  initialState,
  on(fetchCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categoriesFetched: true,
    categories,
    error: initialState.error,
  })),
  on(fetchCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
    categoriesFetched: initialState.categoriesFetched,
    categories: initialState.categories,
  }))
);
