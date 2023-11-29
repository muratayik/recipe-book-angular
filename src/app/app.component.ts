import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  activeScreen = 'categories';

  selectedCategoryId = '';
  selectedMealId = '';

  onShowMealList(categoryId: string) {
    this.activeScreen = 'meal-list';
    this.selectedCategoryId = categoryId;
  }

  onShowMealDetails(mealId: string) {
    this.activeScreen = 'meal-detail';
    this.selectedMealId = mealId;
  }
}
