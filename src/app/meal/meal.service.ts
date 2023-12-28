import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/state';
import * as MealActions from '../store/meal/meal.actions';

import { MealListItem } from './meal-list-item.model';
import { MealDetail } from './meal-detail.model';

@Injectable({ providedIn: 'root' })
export class MealService {
  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  getMeals(categoryName: string) {
    const url = `http://localhost:3001/meal/byCategory/${categoryName}`;

    this.store.dispatch(MealActions.fetchMealList());

    this.http.get<MealListItem[]>(url).subscribe({
      next: (mealList) => {
        this.store.dispatch(MealActions.fetchMealListSucess({ mealList }));
      },
      error: (error) => {
        this.store.dispatch(MealActions.fetchMealListFailure({ error }));
      },
    });
  }

  getMeal(mealPublicId: string) {
    const url = `http://localhost:3001/meal/${mealPublicId}/detail`;
    this.http.get<MealDetail>(url).subscribe({
      next: (mealDetail) => {
        this.store.dispatch(MealActions.fetchMealDetailSuccess({ mealDetail }));
      },
      error: (error) => {
        this.store.dispatch(MealActions.fetchMealDetailFailure({ error }));
      },
    });
  }
}
