import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css'],
})
export class MealListComponent implements OnInit {
  @Input() selectedCategoryId: string;
  @Output() mealIdSelected = new EventEmitter<string>();

  mealList: any[] = [];

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.mealList = this.mealService.getMealsOfCategory(
      this.selectedCategoryId
    );
  }

  onSelectMeal(mealId: string) {
    this.mealIdSelected.emit(mealId);
  }
}
