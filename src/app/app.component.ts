import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { FavoriteService } from './favorite/favorite.service';

import { Store } from '@ngrx/store';
import * as fromApp from './store/state';
import * as AuthSelectors from './store/auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private favoriteService: FavoriteService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();

    this.store
      .select(AuthSelectors.selectIsLoggedIn)
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.favoriteService.fetchFavorites();
        } else {
          this.favoriteService.clearFavorites();
        }
      });
  }
}
