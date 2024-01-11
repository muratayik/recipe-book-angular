import { createAction, props } from '@ngrx/store';
import { AuthInfo } from 'src/app/auth/auth-info.model';

export const login = createAction('[Auth] Login');

export const logout = createAction('[Auth] Logout');

export const register = createAction('[Auth] Register');

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ authInfo: AuthInfo }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ authInfo: AuthInfo }>()
);

export const autoLogin = createAction(
  '[Auth] Auto Login',
  props<{ authInfo: AuthInfo }>()
);
