import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { MealListItem } from '../meal/meal-list-item.model';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  userFavorites: MealListItem[] = [];
  isFavoritesFetched = false;

  favoriteListChanged = new Subject<MealListItem[]>();

  constructor(private http: HttpClient, private authSerivce: AuthService) {}

  isInFavorites(mealPublicId: string) {
    const searchedMeal = this.userFavorites.find(
      (f) => f.publicId === mealPublicId
    );
    return !!searchedMeal;
  }

  getFetchedFavorites() {
    return [...this.userFavorites];
  }

  getIsFavoritesFetched() {
    return this.isFavoritesFetched;
  }

  getFavorites() {
    const token = this.authSerivce.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<MealListItem[]>('http://localhost:3001/favorite', {
        headers,
      })
      .subscribe({
        next: (data) => {
          this.userFavorites = data;
          this.isFavoritesFetched = true;
          this.notifyFavoriteListeners();
        },
        error: (error) => {
          console.log(`error : ${error}`);
        },
      });
  }

  addToFavorites(mealPublicId: string) {
    const token = this.authSerivce.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const data = { mealPublicId };
    this.http
      .post<MealListItem>('http://localhost:3001/favorite/add', data, {
        headers,
      })
      .subscribe({
        next: (addedFavorite) => {
          this.userFavorites.push(addedFavorite);
          this.notifyFavoriteListeners();
        },
        error: (error) => {
          console.log(`error : ${error}`);
        },
      });
  }

  removeFromFavorites(mealPublicId: string) {
    const token = this.authSerivce.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const data = { mealPublicId };
    this.http
      .post<MealListItem>('http://localhost:3001/favorite/remove', data, {
        headers,
      })
      .subscribe({
        next: (removedFavorite) => {
          this.userFavorites = this.userFavorites.filter(
            (f) => f.publicId !== removedFavorite.publicId
          );
          this.notifyFavoriteListeners();
        },
        error: (error) => {
          console.log(`error : ${error}`);
        },
      });
  }

  notifyFavoriteListeners() {
    this.favoriteListChanged.next(this.userFavorites);
  }
}
