import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { FavoriteComponent } from './favorite/favorite.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'category',
  },
  {
    path: 'category',
    component: CategoryListComponent,
  },
  {
    path: ':categoryName/meals',
    component: MealListComponent,
  },
  {
    path: ':mealPublicId/details',
    component: MealDetailComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutesModule {}
