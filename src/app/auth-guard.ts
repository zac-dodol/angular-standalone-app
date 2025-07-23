import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "./auth-service";

export const authGuard: CanActivateFn = () => {
  return inject(AuthService).isLoggedIn();
};
