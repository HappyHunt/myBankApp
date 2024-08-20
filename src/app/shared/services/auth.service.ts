import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  loggedIn = signal(false);

  login() {
    this.loggedIn.set(true);
  }

  logout() {
    this.loggedIn.set(false);
    this.router.navigateByUrl('/login');
  }
}
