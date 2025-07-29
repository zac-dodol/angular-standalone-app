import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { ticketReducer } from './app/ticket-manager/state/ticket.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { notificationReducer } from './app/notifications/state/notification.reducer';
import {
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore({
      tickets: ticketReducer,
      notifications: notificationReducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideAnimations(),
    provideNoopAnimations(),
  ],
}).catch((err) => console.error(err));
