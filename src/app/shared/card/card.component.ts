import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() link: string[];
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() description: string;
  @Input() maxDescriptionLength: number;
  @Input() showFavoriteIcon: boolean;
  @Input() favoriteItemId: string;

  getDescriptionSummary() {
    if (this.description.length < this.maxDescriptionLength) {
      return this.description;
    }

    return this.description.substring(0, this.maxDescriptionLength) + '...';
  }
}
