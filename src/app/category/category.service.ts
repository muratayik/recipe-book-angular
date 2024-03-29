import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/state';
import * as CategoryActions from '../store/category/category.actions';

import { Category } from './category.model';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  getCategories() {
    this.store.dispatch(CategoryActions.fetchCategories());

    return this.http
      .get<Category[]>(`${environment.apiUrl}/category`)
      .subscribe({
        next: (categories) => {
          this.store.dispatch(
            CategoryActions.fetchCategoriesSuccess({ categories })
          );
        },
        error: (error) => {
          console.log(error);
          this.store.dispatch(
            CategoryActions.fetchCategoriesFailure({ error })
          );
        },
      });
  }
}
