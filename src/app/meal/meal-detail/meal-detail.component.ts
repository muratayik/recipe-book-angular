import { Component, OnInit } from '@angular/core';
import { MealService } from '../meal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css'],
})
export class MealDetailComponent implements OnInit {
  meal: any;
  organizedIngredientList: string[] = [];

  constructor(
    private mealService: MealService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const mealId = this.route.snapshot.params['mealId'];
    this.meal = this.mealService.getMeal(mealId);
    this.organizeIngredients();
  }

  organizeIngredients() {
    for (let i = 1; i <= 20; i++) {
      const ingredientName = this.meal[`ingredient${i}`];
      const ingredientMeasure = this.meal[`measure${i}`];
      if (ingredientName && ingredientMeasure) {
        this.organizedIngredientList.push(
          `${ingredientMeasure} ${ingredientName}`
        );
      }
    }
  }
}
