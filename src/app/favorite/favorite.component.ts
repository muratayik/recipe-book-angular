import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoriteService } from './favorite.service';
import { Subscription } from 'rxjs';
import { MealListItem } from '../meal/meal-list-item.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit, OnDestroy {
  favoriteMeals: MealListItem[];
  favoriteListSubs: Subscription;
  isFavoritesFetched = false;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.isFavoritesFetched = this.favoriteService.getIsFavoritesFetched();
    this.favoriteMeals = this.favoriteService.getFetchedFavorites();
    this.favoriteListSubs = this.favoriteService.favoriteListChanged.subscribe(
      (data) => {
        this.favoriteMeals = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.favoriteListSubs?.unsubscribe();
  }
}
