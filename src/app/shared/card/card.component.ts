import { Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/state';
import * as FavoriteSelectors from '../../store/favorite/favorite.selectors';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() link: string[];
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() description: string;
  @Input() showFavoriteIcon: boolean;
  @Input() favoriteItemId: string;
  @Input() isLoggedIn: boolean;

  isInFavorites = false;

  constructor(private store: Store<fromApp.AppState>) {}

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
}
