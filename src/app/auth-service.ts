import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthService {
  isLoggedIn = signal(false);

  toggle() {
    this.isLoggedIn.set(!this.isLoggedIn());
  }
}
