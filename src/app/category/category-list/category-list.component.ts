import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../../store/state';
import * as CategorySelectors from '../../store/category/category.selectors';
import { Category } from '../category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categoriesFetched = false;
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories();
    this.store
      .select(CategorySelectors.selectCategoryList)
      .subscribe((categories) => (this.categories = categories));

    this.store
      .select(CategorySelectors.selectCategoriesFetched)
      .subscribe((categoriesFetched) => {
        this.categoriesFetched = categoriesFetched;
      });
  }

  getDescriptionSummary(description: string) {
    const descriptionMaxLen = 200;

    if (description.length < descriptionMaxLen) {
      return description;
    }

    return description.substring(0, descriptionMaxLen) + '...';
  }
}
