import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MealService {
  constructor(private http: HttpClient) {}

  getMeals(categoryName: string) {
    const url = `http://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
    return this.http.get(url);
  }

  getMeal(mealId: string) {
    const url = `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    return this.http.get(url);
  }
}
