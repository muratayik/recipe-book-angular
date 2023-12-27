import { ActionReducerMap } from '@ngrx/store';

import * as fromCategory from './category/category.reducer';

export interface AppState {
  category: fromCategory.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  category: fromCategory.categoryReducer,
};
