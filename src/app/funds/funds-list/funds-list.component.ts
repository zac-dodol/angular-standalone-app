import { Component, computed, OnInit, signal, inject } from '@angular/core';
import { Fund } from '../../models/fund.model';
import { FundService } from '../../services/fund.service';
import { Router } from '@angular/router';
import { FundDetailsDialogComponent } from '../fund-details-dialog/fund-details-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funds-list',
  standalone: true,
  imports: [CommonModule, FundDetailsDialogComponent],
  templateUrl: './funds-list.component.html',
  styleUrl: './funds-list.component.scss',
})
export class FundsListComponent implements OnInit {
  private fundService = inject(FundService);
  private router = inject(Router);

  // Track selected tab
  selectedTab = signal<'new' | 'all'>('new');

  // List of funds
  newFunds: Fund[] = [];
  allFunds: Fund[] = [];
  selectedFund?: Fund;

  ngOnInit(): void {
    this.loadNewFunds();
    this.loadAllFunds();
  }

  loadNewFunds() {
    this.fundService.getNewFunds().subscribe((funds) => {
      this.newFunds = funds;
    });
  }

  loadAllFunds() {
    this.fundService.getAllFunds().subscribe((funds) => {
      this.allFunds = funds;
    });
  }

  showNewFunds() {
    this.selectedTab.set('new');
  }

  showAllFunds() {
    this.selectedTab.set('all');
  }

  visibleFunds = computed(() => {
    return this.selectedTab() === 'new' ? this.newFunds : this.allFunds;
  });

  openDetails(fund: Fund): void {
    this.selectedFund = fund;
  }

  closeDetailsDialog(result?: { fund: Fund; quantity: number }): void {
    this.selectedFund = undefined;
    if (result?.fund && result.quantity > 0) {
      // Navigate to summary page with state data
      this.router.navigate(['/summary'], { state: result });
    }
  }
}
