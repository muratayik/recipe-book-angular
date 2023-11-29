import { Component, Input, OnInit } from '@angular/core';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css'],
})
export class MealDetailComponent implements OnInit {
  @Input() selectedMealId: string;

  meal: any;

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.meal = this.mealService.getMeal(this.selectedMealId);
  }
}
