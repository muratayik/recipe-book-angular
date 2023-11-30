import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categoryList: any[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryList = this.categoryService.getCategoryList();
  }

  getDescriptionSummary(description: string) {
    const descriptionMaxLen = 200;

    if (description.length < descriptionMaxLen) {
      return description;
    }

    return description.substring(0, descriptionMaxLen) + '...';
  }
}
