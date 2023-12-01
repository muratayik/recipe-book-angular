import { Component, OnDestroy, OnInit } from '@angular/core';
import { MealService } from '../meal.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css'],
})
export class MealDetailComponent implements OnInit, OnDestroy {
  meal: any;
  organizedIngredientList: string[] = [];

  getMealSubs: Subscription;

  constructor(
    private mealService: MealService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const mealId = this.route.snapshot.params['mealId'];

    this.getMealSubs = this.mealService
      .getMeal(mealId)
      .subscribe((data: any) => {
        this.meal = data.meals[0];
        this.organizeIngredients();
      });
  }

  organizeIngredients() {
    for (let i = 1; i <= 20; i++) {
      const ingredientName = this.meal[`strIngredient${i}`];
      const ingredientMeasure = this.meal[`strMeasure${i}`];
      if (ingredientName && ingredientMeasure) {
        this.organizedIngredientList.push(
          `${ingredientMeasure} ${ingredientName}`
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.getMealSubs?.unsubscribe();
  }
}
