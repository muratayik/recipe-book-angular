import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure,
  logout,
} from './auth.actions';

export interface State {
  isLoggedIn: boolean;
  email: string;
  username: string;
  role: string;
  token: string;
}

const initialState: State = {
  isLoggedIn: false,
  email: '',
  username: '',
  role: '',
  token: '',
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    isLoggedIn: true,
  })),
  on(loginSuccess, (state, { authInfo }) => ({
    ...state,
    ...authInfo,
    isLoggedIn: true,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(register, (state) => ({
    ...state,
    isLoggedIn: true,
  })),
  on(registerSuccess, (state, { authInfo }) => ({
    ...state,
    ...authInfo,
    isLoggedIn: true,
  })),
  on(registerFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(logout, (state) => ({
    ...state,
    ...initialState,
  }))
);
