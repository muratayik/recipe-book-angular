import { createSelector } from '@ngrx/store';
import * as fromApp from '../state';

import * as fromFavorite from './favorite.reducer';

const selectFavorite = (state: fromApp.AppState) => state.favorite;

export const selectFavoritesFetched = createSelector(
  selectFavorite,
  (state: fromFavorite.State) => state.favoritesFetched
);

export const selectFavorites = createSelector(
  selectFavorite,
  (state: fromFavorite.State) => state.favorites
);

export const selectIsInFavorites = (mealPublicId: string) =>
  createSelector(selectFavorite, (state: fromFavorite.State) => {
    if (!state.favoritesFetched) return false;

    if (!state.favorites.length) return false;

    const favorite = state.favorites.find((f) => f.publicId === mealPublicId);

    return !!favorite;
  });
