import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/category/category.model';

export const fetchCategories = createAction('[Category] FetchCategories');

export const fetchCategoriesSuccess = createAction(
  '[Category] FetchCategories Success',
  props<{ categories: Category[] }>()
);

export const fetchCategoriesFailure = createAction(
  '[Category] FetchCategories Failure',
  props<{ error: string }>()
);
