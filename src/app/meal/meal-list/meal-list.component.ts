import { Component, OnInit } from '@angular/core';
import { MealService } from '../meal.service';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/state';
import * as MealSelectors from '../../store/meal/meal.selectors';
import { MealListItem } from '../meal-list-item.model';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css'],
})
export class MealListComponent implements OnInit {
  mealList: MealListItem[] = [];
  mealListFetched = false;

  constructor(
    private mealService: MealService,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    const categoryName = this.route.snapshot.params['categoryName'];

    this.mealService.getMeals(categoryName);

    this.store
      .select(MealSelectors.selectMealListFetched)
      .subscribe((mealListFetched) => {
        this.mealListFetched = mealListFetched;
      });

    this.store.select(MealSelectors.selectMealList).subscribe((mealList) => {
      this.mealList = mealList;
    });
  }
}
