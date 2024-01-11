import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  register,
  registerSuccess,
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
  on(login, register, logout, (state) => ({
    ...state,
    ...initialState,
  })),
  on(loginSuccess, registerSuccess, (state, { authInfo }) => ({
    ...state,
    ...authInfo,
    isLoggedIn: true,
  }))
);
