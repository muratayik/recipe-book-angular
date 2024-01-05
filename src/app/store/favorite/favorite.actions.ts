import { createAction, props } from '@ngrx/store';

import { MealListItem } from 'src/app/meal/meal-list-item.model';

export const clearFavorites = createAction('[Favorite] Clear Favorites');

export const fetchFavorites = createAction('[Favorite] Fetch Favorites');

export const fetchFavoritesSuccess = createAction(
  '[Favorite] Fetch Favorites Success',
  props<{ favorites: MealListItem[] }>()
);

export const fetchFavoritesFailure = createAction(
  '[Favorite] Fetch Favorites  Failure',
  props<{ error: string }>()
);

export const addToFavorites = createAction(
  '[Favorite] Add To Favorites',
  props<{ favorite: MealListItem }>()
);

export const removeFromFavorites = createAction(
  '[Favorite] Remove From Favorites',
  props<{ favorite: MealListItem }>()
);
