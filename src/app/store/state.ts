import { ActionReducerMap } from '@ngrx/store';

import * as fromCategory from './category/category.reducer';
import * as fromMeal from './meal/meal.reducer';
import * as fromFavorite from './favorite/favorite.reducer';

export interface AppState {
  category: fromCategory.State;
  meal: fromMeal.State;
  favorite: fromFavorite.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  category: fromCategory.categoryReducer,
  meal: fromMeal.mealReducer,
  favorite: fromFavorite.favoriteReducer,
};
