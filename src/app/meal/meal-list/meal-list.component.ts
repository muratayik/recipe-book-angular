import { Component, OnDestroy, OnInit } from '@angular/core';
import { MealService } from '../meal.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css'],
})
export class MealListComponent implements OnInit, OnDestroy {
  mealList: any[] = [];

  mealListSubs: Subscription;

  constructor(
    private mealService: MealService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const categoryName = this.route.snapshot.params['categoryName'];

    this.mealListSubs = this.mealService
      .getMeals(categoryName)
      .subscribe((mealList) => {
        this.mealList = mealList;
      });
  }

  ngOnDestroy(): void {
    this.mealListSubs?.unsubscribe();
  }
}
