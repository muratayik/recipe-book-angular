import { Component, OnDestroy, OnInit } from '@angular/core';
import { MealService } from '../meal.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MealListItem } from '../meal-list-item.model';
import { Category } from 'src/app/category/category.model';
import { Ingredient, Instruction } from '../meal-detail.model';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css'],
})
export class MealDetailComponent implements OnInit, OnDestroy {
  isMealLoaded = false;
  mealInfo: MealListItem;
  categoryInfo: Category;
  instructions: Instruction[];
  ingredients: Ingredient[];

  getMealSubs: Subscription;

  constructor(
    private mealService: MealService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const mealPublicId = this.route.snapshot.params['mealPublicId'];

    this.getMealSubs = this.mealService
      .getMeal(mealPublicId)
      .subscribe((meal) => {
        const { mealInfo, categoryInfo, instructions, ingredients } = meal;
        this.mealInfo = mealInfo;
        this.categoryInfo = categoryInfo;
        this.instructions = instructions;
        this.ingredients = ingredients;
        this.isMealLoaded = true;
      });
  }

  ngOnDestroy(): void {
    this.getMealSubs?.unsubscribe();
  }
}
