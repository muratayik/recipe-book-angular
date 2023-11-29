import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  @Output() categoryIdSelected = new EventEmitter<string>();

  categoryList: any[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryList = this.categoryService.getCategoryList();
  }

  onSelectCategory(categoryId: string) {
    this.categoryIdSelected.emit(categoryId);
  }
}
