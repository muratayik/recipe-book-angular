import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthInfo } from './auth-info.model';
import { AuthAPIResponse } from './auth-rapi-response.model';
import { Subject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticationInfo: AuthInfo = {
    isLoggedIn: false,
    email: '',
    username: '',
    role: '',
    token: '',
  };

  authenticationStatusChanged = new Subject<AuthInfo>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.authenticationInfo.token || localStorage.getItem('token') || '';
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

          this.authenticationInfo = {
            isLoggedIn: true,
            username,
            role,
            email,
            token,
          };

          this.notifyAuthListeners();
          this.router.navigate(['/', 'category']);
        },
        error: (error) => {
          console.log('error :', error);
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

          this.authenticationInfo = {
            isLoggedIn: true,
            username,
            role,
            email,
            token,
          };

          this.notifyAuthListeners();
          this.router.navigate(['/', 'category']);
        },
        error: (error) => {
          console.log('error :', error);
        },
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.authenticationInfo = {
      isLoggedIn: false,
      username: '',
      role: '',
      email: '',
      token: '',
    };
    this.notifyAuthListeners();
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

          this.authenticationInfo = {
            isLoggedIn: true,
            username,
            role,
            email,
            token: localStorageToken,
          };

          this.notifyAuthListeners();
          this.router.navigate(['/', 'category']);
        },
        error: (error) => {
          console.log('error :', error);
        },
      });
  }

  notifyAuthListeners() {
    this.authenticationStatusChanged.next(this.authenticationInfo);
  }
}
