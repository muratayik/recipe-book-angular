import { createSelector } from '@ngrx/store';

import * as fromApp from '../state';
import * as fromMeal from './meal.reducer';

const selectMeal = (state: fromApp.AppState) => state.meal;

export const selectMealList = createSelector(
  selectMeal,
  (state: fromMeal.State) => state.mealList
);

export const selectMealListFetched = createSelector(
  selectMeal,
  (state: fromMeal.State) => state.mealListFetched
);

export const selectMealListError = createSelector(
  selectMeal,
  (state: fromMeal.State) => state.mealListError
);

export const selectMealDetail = createSelector(
  selectMeal,
  (state: fromMeal.State) => state.mealDetail
);

export const selectMealDetailFetched = createSelector(
  selectMeal,
  (state: fromMeal.State) => state.mealDetailFetched
);

export const selectMealDetailError = createSelector(
  selectMeal,
  (state: fromMeal.State) => state.mealDetailError
);
