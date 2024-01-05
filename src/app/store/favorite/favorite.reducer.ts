import { createReducer, on } from '@ngrx/store';

import { MealListItem } from 'src/app/meal/meal-list-item.model';
import * as FavoriteActions from './favorite.actions';

export interface State {
  favoritesFetched: boolean;
  favorites: MealListItem[];
  error: string;
}

const initialState: State = {
  favoritesFetched: false,
  favorites: [],
  error: '',
};

export const favoriteReducer = createReducer(
  initialState,
  on(FavoriteActions.fetchFavorites, (state) => ({
    ...state,
    ...initialState,
  })),
  on(FavoriteActions.fetchFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    ...initialState,
    favorites,
    favoritesFetched: true,
  })),
  on(FavoriteActions.fetchFavoritesFailure, (state, { error }) => ({
    ...state,
    ...initialState,
    error,
    favoritesFetched: true,
  })),
  on(FavoriteActions.addToFavorites, (state, { favorite }) => ({
    ...state,
    favorites: [...state.favorites, favorite],
  })),
  on(FavoriteActions.removeFromFavorites, (state, { favorite }) => ({
    ...state,
    favorites: state.favorites.filter((f) => f.publicId !== favorite.publicId),
  })),
  on(FavoriteActions.clearFavorites, (state) => ({
    ...state,
    ...initialState,
  }))
);
