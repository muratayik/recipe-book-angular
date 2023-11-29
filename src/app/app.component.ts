import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category/category.service';
import { MealService } from './meal/meal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  categoryList: any[] = [];
  mealList: any[] = [];
  mealDetail: any = null;
  activeScreen = 'categories';

  constructor(
    private categoryService: CategoryService,
    private mealService: MealService
  ) {}

  ngOnInit(): void {
    this.categoryList = this.categoryService.getCategoryList();
  }

  onShowMealList(categoryId: string) {
    this.activeScreen = 'meal-list';
    this.mealList = this.mealService.getMealsOfCategory(categoryId);
  }

  onShowMealDetails(mealId: string) {
    this.activeScreen = 'meal-detail';
    this.mealDetail = this.mealService.getMeal(mealId);
    console.log(this.mealDetail);
  }
}
