import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categoryList: any[] = [];

  categoryListSubs: Subscription;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryListSubs = this.categoryService
      .getCategories()
      .subscribe((categories) => {
        this.categoryList = categories;
      });
  }

  getDescriptionSummary(description: string) {
    const descriptionMaxLen = 200;

    if (description.length < descriptionMaxLen) {
      return description;
    }

    return description.substring(0, descriptionMaxLen) + '...';
  }

  ngOnDestroy(): void {
    this.categoryListSubs?.unsubscribe();
  }
}
