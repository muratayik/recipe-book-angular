import { Component, OnDestroy, OnInit } from '@angular/core';
import { Favorite } from './favorite.model';
import { FavoriteService } from './favorite.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit, OnDestroy {
  favorites: Favorite[];
  favoriteListSubs: Subscription;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.favoriteService.getFavorites();
    this.favoriteListSubs = this.favoriteService.favoriteListChanged.subscribe(
      (data) => {
        console.log('favorites : ', data);
        this.favorites = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.favoriteListSubs?.unsubscribe();
  }
}
