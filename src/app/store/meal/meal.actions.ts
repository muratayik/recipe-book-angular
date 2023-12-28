import { createAction, props } from '@ngrx/store';
import { MealListItem } from 'src/app/meal/meal-list-item.model';
import { MealDetail } from 'src/app/meal/meal-detail.model';

export const fetchMealList = createAction('[Meal] Fetch Meal List');
export const fetchMealListSucess = createAction(
  '[Meal] Fetch Meal List Success',
  props<{ mealList: MealListItem[] }>()
);
export const fetchMealListFailure = createAction(
  '[Meal] Fetch Meal List Failure',
  props<{ error: string }>()
);

export const fetchMealDetail = createAction('[Meal] Fetch Meal Details');
export const fetchMealDetailSuccess = createAction(
  '[Meal] Fetch Meal Details Success',
  props<{ mealDetail: MealDetail }>()
);
export const fetchMealDetailFailure = createAction(
  '[Meal] Fetch Meal Details Failure',
  props<{ error: string }>()
);
