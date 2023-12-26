import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.isInFavorites = this.favoriteService.isInFavorites(
      this.favoriteItemId
    );

    this.favoriteService.favoriteListChanged.subscribe((data) => {
      this.isInFavorites = !!data.find(
        (f) => f.publicId === this.favoriteItemId
      );
    });
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
