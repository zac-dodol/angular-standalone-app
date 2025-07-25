import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { AboutComponent } from './about/about.component';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: 'hello', component: HelloComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'lazy',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./lazy/lazy.component').then((m) => m.LazyComponent),
  },
  {
    path: 'ticket-manager',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./ticket-manager/ticket-manager.component').then(
        (m) => m.TicketManagerComponent
      ),
  },
  { path: '', redirectTo: '/hello', pathMatch: 'full' },
];
