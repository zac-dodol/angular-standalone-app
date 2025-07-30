import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { PortfolioListComponent } from '../portfolio-list/portfolio-list.component';
import { FundsListComponent } from '../../funds/funds-list/funds-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fund-header',
  standalone: true,
  imports: [PortfolioListComponent, FundsListComponent, CommonModule],
  templateUrl: './fund-header.component.html',
  styleUrl: './fund-header.component.scss',
})
export class FundHeaderComponent {
  private auth = inject(AuthService);
  isLoggedIn = computed(() => this.auth.isLoggedIn());

  // Active tab: either 'portfolio' or 'funds'
  activeTab = signal<'portfolio' | 'funds'>('portfolio');

  showPortfolio() {
    this.activeTab.set('portfolio');
  }

  showFunds() {
    this.activeTab.set('funds');
  }
}
