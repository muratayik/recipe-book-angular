import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthInfo } from './auth-info.model';
import { AuthAPIResponse } from './auth-rapi-response.model';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/state';
import * as AuthActions from '../store/auth/auth.actions';

import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private toastr: ToastrService
  ) {}

  getToken() {
    return (
      localStorage.getItem('token') || sessionStorage.getItem('token') || ''
    );
  }

  loginUser(email: string, password: string, rememberMe: boolean) {
    this.store.dispatch(AuthActions.login());
    const data = {
      email,
      password,
    };
    return this.http
      .post<AuthAPIResponse>(`${environment.apiUrl}/account/login`, data)
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
        error: ({ error }) => {
          this.toastr.error(error);
        },
      });
  }

  registerUser(email: string, username: string, password: string) {
    this.store.dispatch(AuthActions.register());
    const data = {
      email,
      username,
      password,
    };

    return this.http
      .post<AuthAPIResponse>(`${environment.apiUrl}/account/register`, data)
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
        error: ({ error }) => {
          this.toastr.error(error);
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
      .post<AuthAPIResponse>(`${environment.apiUrl}/account/verify`, data)
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
        error: () => {
          localStorage.removeItem('token');
        },
      });
  }
}
