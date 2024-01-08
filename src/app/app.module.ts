import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { AppRoutesModule } from './app.routes';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './shared/card/card.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { StoreModule } from '@ngrx/store';

import * as fromApp from './store/state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DescriptionDirective } from './shared/directive/description.directive';
import { CardDescriptionComponent } from './shared/card/card-description/card-description.component';
import { CardFooterComponent } from './shared/card/card-footer/card-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    MealListComponent,
    MealDetailComponent,
    NavbarComponent,
    CardComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    FavoriteComponent,
    DescriptionDirective,
    CardDescriptionComponent,
    CardFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
