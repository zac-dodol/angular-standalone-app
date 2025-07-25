import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { ticketReducer } from './app/state/ticket.reducer';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideStore({ tickets: ticketReducer })],
}).catch((err) => console.error(err));
