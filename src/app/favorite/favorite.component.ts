import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/state';
import * as FavoriteSelectors from '../store/favorite/favorite.selectors';

import { MealListItem } from '../meal/meal-list-item.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  favoritesFetched = false;
  favorites: MealListItem[];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store
      .select(FavoriteSelectors.selectFavoritesFetched)
      .subscribe((favoritesFetched) => {
        this.favoritesFetched = favoritesFetched;
      });

    this.store
      .select(FavoriteSelectors.selectFavorites)
      .subscribe((favorites) => {
        this.favorites = favorites;
      });
  }
}
