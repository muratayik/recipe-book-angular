import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/state';
import * as MealSelectors from '../../store/meal/meal.selectors';

import { MealService } from '../meal.service';
import { MealListItem } from '../meal-list-item.model';
import { Category } from 'src/app/category/category.model';
import { Ingredient, Instruction } from '../meal-detail.model';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css'],
})
export class MealDetailComponent implements OnInit {
  mealDetailFetched = false;
  mealInfo: MealListItem;
  categoryInfo: Category;
  instructions: Instruction[];
  ingredients: Ingredient[];

  constructor(
    private mealService: MealService,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    const mealPublicId = this.route.snapshot.params['mealPublicId'];

    this.mealService.getMeal(mealPublicId);

    this.store
      .select(MealSelectors.selectMealListFetched)
      .subscribe(
        (mealDetailFetched) => (this.mealDetailFetched = mealDetailFetched)
      );

    this.store
      .select(MealSelectors.selectMealDetail)
      .subscribe((mealDetail) => {
        if (mealDetail) {
          const { mealInfo, categoryInfo, instructions, ingredients } =
            mealDetail;
          this.mealInfo = mealInfo;
          this.categoryInfo = categoryInfo;
          this.instructions = instructions;
          this.ingredients = ingredients;
        }
      });
  }
}
