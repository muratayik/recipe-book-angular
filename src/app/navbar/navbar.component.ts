import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  authSubs: Subscription;
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubs = this.authService.authenticationStatusChanged.subscribe(
      (authInfo) => {
        const { isLoggedIn } = authInfo;
        this.isLoggedIn = isLoggedIn;
      }
    );
  }

  ngOnDestroy(): void {}
}
