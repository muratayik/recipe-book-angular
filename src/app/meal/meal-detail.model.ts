import { Category } from '../category/category.model';
import { MealListItem } from './meal-list-item.model';

export interface MealDetail {
  mealInfo: MealListItem;
  categoryInfo: Category;
  instructions: Instruction[];
  ingredients: Ingredient[];
}

export interface Instruction {
  id: number;
  sequence: number;
  step: string;
  mealId: number;
}

export interface Ingredient {
  id: number;
  name: string;
  amount: string;
  mealId: number;
}
