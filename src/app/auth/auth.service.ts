import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthInfo } from './auth-info.model';
import { AuthAPIResponse } from './auth-rapi-response.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/state';
import * as AuthActions from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  getToken() {
    return (
      localStorage.getItem('token') || sessionStorage.getItem('token') || ''
    );
  }

  loginUser(email: string, password: string, rememberMe: boolean) {
    const data = {
      email,
      password,
    };
    return this.http
      .post<AuthAPIResponse>('http://localhost:3001/account/login', data)
      .subscribe({
        next: (data) => {
          const { email, role, token, username } = data;
          if (rememberMe) {
            localStorage.setItem('token', token);
          }

          const authInfo: AuthInfo = {
            email,
            role,
            token,
            username,
            isLoggedIn: true,
          };

          this.store.dispatch(AuthActions.loginSuccess({ authInfo }));
          this.router.navigate(['/', 'category']);
        },
        error: (error) => {
          this.store.dispatch(AuthActions.loginFailure({ error }));
        },
      });
  }

  registerUser(email: string, username: string, password: string) {
    const data = {
      email,
      username,
      password,
    };

    return this.http
      .post<AuthAPIResponse>('http://localhost:3001/account/register', data)
      .subscribe({
        next: (data) => {
          const { email, role, token, username } = data;

          localStorage.setItem('token', token);

          const authInfo: AuthInfo = {
            email,
            role,
            token,
            username,
            isLoggedIn: true,
          };

          this.store.dispatch(AuthActions.registerSuccess({ authInfo }));
          this.router.navigate(['/', 'category']);
        },
        error: (error) => {
          this.store.dispatch(AuthActions.registerFailure({ error }));
        },
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/', 'category']);
  }

  autoLogin() {
    const localStorageToken = localStorage.getItem('token');
    if (!localStorageToken) return;

    const data = {
      token: localStorageToken,
    };

    return this.http
      .post<AuthAPIResponse>('http://localhost:3001/account/verify', data)
      .subscribe({
        next: (data) => {
          const { email, role, username } = data;

          const authInfo: AuthInfo = {
            email,
            role,
            token: localStorageToken,
            username,
            isLoggedIn: true,
          };

          this.store.dispatch(AuthActions.loginSuccess({ authInfo }));
          this.router.navigate(['/', 'category']);
        },
        error: (error) => {
          console.log('error :', error);
          localStorage.removeItem('token');
        },
      });
  }
}
