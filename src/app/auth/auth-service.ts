import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = signal(false);

  constructor(private router: Router) {
    const stored = localStorage.getItem('auth_token');
    if (stored) this._isLoggedIn.set(true);
  }

  isLoggedIn() {
    return this._isLoggedIn();
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('auth_token', 'mock-token');
      this._isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this._isLoggedIn.set(false);
    this.router.navigateByUrl('/');
  }
}
