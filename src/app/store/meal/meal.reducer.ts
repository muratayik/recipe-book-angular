import { createReducer, on } from '@ngrx/store';
import { MealDetail } from 'src/app/meal/meal-detail.model';
import { MealListItem } from 'src/app/meal/meal-list-item.model';

import * as MealActions from './meal.actions';

export interface State {
  mealListFetched: boolean;
  mealDetailFetched: boolean;
  mealList: MealListItem[];
  mealDetail: MealDetail | null;
  mealListError: string;
  mealDetailError: string;
}

const initialState: State = {
  mealListFetched: false,
  mealDetailFetched: false,
  mealList: [],
  mealDetail: null,
  mealListError: '',
  mealDetailError: '',
};

export const mealReducer = createReducer(
  initialState,
  on(MealActions.fetchMealList, (state) => ({
    ...state,
    ...initialState,
  })),
  on(MealActions.fetchMealListSucess, (state, { mealList }) => ({
    ...state,
    mealList,
    mealListFetched: true,
  })),
  on(MealActions.fetchMealListFailure, (state, { error }) => ({
    ...state,
    ...initialState,
    mealListFetched: true,
    mealListError: error,
  })),
  on(MealActions.fetchMealDetail, (state) => ({
    ...state,
    ...initialState,
  })),
  on(MealActions.fetchMealDetailSuccess, (state, { mealDetail }) => ({
    ...state,
    mealDetail,
    mealDetailFetched: true,
  })),
  on(MealActions.fetchMealDetailFailure, (state, { error }) => ({
    ...state,
    mealDetailFetched: true,
    mealDetailError: error,
  }))
);
