import { createReducer, on } from '@ngrx/store';

import {
  fetchCategories,
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
  on(fetchCategories, (state) => ({
    ...state,
    categoriesFetched: false,
    categories: initialState.categories,
    error: initialState.error,
  })),
  on(fetchCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categoriesFetched: true,
    categories,
    error: initialState.error,
  })),
  on(fetchCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
    categoriesFetched: true,
    categories: initialState.categories,
  }))
);
