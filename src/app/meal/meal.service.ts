import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MealListItem } from './meal-list-item.model';
import { MealDetail } from './meal-detail.model';

@Injectable({ providedIn: 'root' })
export class MealService {
  constructor(private http: HttpClient) {}

  getMeals(categoryName: string) {
    const url = `http://localhost:3001/meal/byCategory/${categoryName}`;
    return this.http.get<MealListItem[]>(url);
  }

  getMeal(mealPublicId: string) {
    const url = `http://localhost:3001/meal/${mealPublicId}/detail`;
    return this.http.get<MealDetail>(url);
  }
}
