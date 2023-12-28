import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/state';
import * as FavoriteActions from '../store/favorite/favorite.actions';

import { AuthService } from '../auth/auth.service';
import { MealListItem } from '../meal/meal-list-item.model';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  userFavorites: MealListItem[] = [];
  isFavoritesFetched = false;

  favoriteListChanged = new Subject<MealListItem[]>();

  constructor(
    private http: HttpClient,
    private authSerivce: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  isInFavorites(mealPublicId: string) {
    const searchedMeal = this.userFavorites.find(
      (f) => f.publicId === mealPublicId
    );
    return !!searchedMeal;
  }

  fetchFavorites() {
    this.store.dispatch(FavoriteActions.fetchFavorites());

    this.http
      .get<MealListItem[]>(
        'http://localhost:3001/favorite',
        this.createHeaderWithToken()
      )
      .subscribe({
        next: (favorites) => {
          this.store.dispatch(
            FavoriteActions.fetchFavoritesSuccess({ favorites })
          );
        },
        error: (error) => {
          this.store.dispatch(FavoriteActions.fetchFavoritesFailure({ error }));
        },
      });
  }

  addToFavorites(mealPublicId: string) {
    this.http
      .post<MealListItem>(
        'http://localhost:3001/favorite/add',
        { mealPublicId },
        this.createHeaderWithToken()
      )
      .subscribe({
        next: (favorite) => {
          this.store.dispatch(FavoriteActions.addToFavorites({ favorite }));
        },
        error: (error) => {
          this.store.dispatch(FavoriteActions.fetchFavoritesFailure({ error }));
        },
      });
  }

  removeFromFavorites(mealPublicId: string) {
    this.http
      .post<MealListItem>(
        'http://localhost:3001/favorite/remove',
        { mealPublicId },
        this.createHeaderWithToken()
      )
      .subscribe({
        next: (favorite) => {
          this.store.dispatch(
            FavoriteActions.removeFromFavorites({ favorite })
          );
        },
        error: (error) => {
          this.store.dispatch(FavoriteActions.fetchFavoritesFailure({ error }));
        },
      });
  }

  createHeaderWithToken() {
    const token = this.authSerivce.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return {
      headers,
    };
  }
}
