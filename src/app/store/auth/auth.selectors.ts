import { createSelector } from '@ngrx/store';

import * as fromApp from '../state';
import * as fromAuth from './auth.reducer';

const selectAuth = (state: fromApp.AppState) => state.auth;

export const selectIsLoggedIn = createSelector(
  selectAuth,
  (state: fromAuth.State) => state.isLoggedIn
);

export const selectIsLoggedInAndUsername = createSelector(
  selectAuth,
  (state: fromAuth.State) => ({
    isLoggedIn: state.isLoggedIn,
    username: state.username,
  })
);
