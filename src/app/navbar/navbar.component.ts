import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromApp from '../store/state';
import * as AuthSelectors from '../store/auth/auth.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  authSubs: Subscription;
  isLoggedIn = false;
  username = '';

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store
      .select(AuthSelectors.selectIsLoggedInAndUsername)
      .subscribe(({ isLoggedIn, username }) => {
        this.isLoggedIn = isLoggedIn;
        this.username = username;
      });
  }

  ngOnDestroy(): void {}
}
