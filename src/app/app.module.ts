import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { AppRoutesModule } from './app.routes';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    MealListComponent,
    MealDetailComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
