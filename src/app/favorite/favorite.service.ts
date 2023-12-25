import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Favorite } from './favorite.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  userFavorites: Favorite[] = [];

  favoriteListChanged = new Subject<Favorite[]>();

  constructor(private http: HttpClient, private authSerivce: AuthService) {}

  getFavorites() {
    const token = this.authSerivce.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<Favorite[]>('http://localhost:3001/favorite', {
        headers,
      })
      .subscribe({
        next: (data) => {
          this.userFavorites = data;
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
