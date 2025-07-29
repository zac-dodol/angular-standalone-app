import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { AboutComponent } from './about/about.component';
import { authGuard } from './auth/auth-guard';
import { PortfolioListComponent } from './portfolio/portfolio-list/portfolio-list.component';
import { FundsListComponent } from './funds/funds-list/funds-list.component';
import { PurchaseSummaryComponent } from './funds/fund-purchase-summary/fund-purchase-summary.component';
import { PurchaseReceiptComponent } from './funds/purchase-receipt/purchase-receipt.component';

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
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login.component').then((m) => m.LoginComponent),
  },
  { path: 'portfolio', component: PortfolioListComponent },
  { path: 'funds', component: FundsListComponent },
  { path: 'summary', component: PurchaseSummaryComponent },
  { path: 'receipt', component: PurchaseReceiptComponent },
  { path: '', redirectTo: '/hello', pathMatch: 'full' },
  { path: '**', redirectTo: '/hello' },
];
