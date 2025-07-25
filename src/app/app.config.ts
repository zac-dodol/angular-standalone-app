import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { ticketReducer } from './ticket-manager/state/ticket.reducer';
import { authReducer } from './auth/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes),
    provideStore({ tickets: ticketReducer, auth: authReducer }),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
