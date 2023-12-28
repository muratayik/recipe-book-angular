import { ActionReducerMap } from '@ngrx/store';

import * as fromCategory from './category/category.reducer';
import * as fromMeal from './meal/meal.reducer';

export interface AppState {
  category: fromCategory.State;
  meal: fromMeal.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  category: fromCategory.categoryReducer,
  meal: fromMeal.mealReducer,
};
