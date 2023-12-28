import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/state';
import * as FavoriteSelectors from '../../store/favorite/favorite.selectors';

import { FavoriteService } from 'src/app/favorite/favorite.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() link: string[];
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() description: string;
  @Input() maxDescriptionLength: number;
  @Input() showFavoriteIcon: boolean;
  @Input() favoriteItemId: string;

  isInFavorites = false;
  favoriteListChangedSubs: Subscription;

  constructor(
    private favoriteService: FavoriteService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    if (!!this.favoriteItemId) {
      const selector = FavoriteSelectors.selectIsInFavorites(
        this.favoriteItemId
      );

      this.store.select(selector).subscribe((isInFavorites) => {
        this.isInFavorites = isInFavorites;
      });
    }
  }

  getDescriptionSummary() {
    if (this.description.length < this.maxDescriptionLength) {
      return this.description;
    }

    return this.description.substring(0, this.maxDescriptionLength) + '...';
  }

  addToFavorites(mealPublicId: string) {
    this.favoriteService.addToFavorites(mealPublicId);
  }

  removeFromFavorites(mealPublicId: string) {
    this.favoriteService.removeFromFavorites(mealPublicId);
  }

  ngOnDestroy(): void {
    this.favoriteListChangedSubs?.unsubscribe();
  }
}
