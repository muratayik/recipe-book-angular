import { Component, Input } from '@angular/core';
import { FavoriteService } from 'src/app/favorite/favorite.service';

@Component({
  selector: 'app-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.css'],
})
export class CardFooterComponent {
  @Input() isLoggedIn = false;
  @Input() isInFavorites = false;
  @Input() favoriteItemId: string;

  constructor(private favoriteService: FavoriteService) {}

  addToFavorites(mealPublicId: string) {
    this.favoriteService.addToFavorites(mealPublicId);
  }

  removeFromFavorites(mealPublicId: string) {
    this.favoriteService.removeFromFavorites(mealPublicId);
  }
}
