import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { FavoriteService } from './favorite/favorite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  authenticationStatusChangedSubs: Subscription;

  constructor(
    private authService: AuthService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.authService.authenticationStatusChanged.subscribe((data) => {
      if (data.isLoggedIn) {
        this.favoriteService.fetchFavorites();
      }
    });
  }

  ngOnDestroy(): void {
    this.authenticationStatusChangedSubs?.unsubscribe();
  }
}
