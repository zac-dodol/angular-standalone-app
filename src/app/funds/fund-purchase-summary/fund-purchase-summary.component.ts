import { ToastService } from './../../services/toast.service';
import { Component, inject, OnInit } from '@angular/core';
import { Fund } from '../../models/fund.model';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase-summary',
  templateUrl: './fund-purchase-summary.component.html',
  styleUrls: ['./fund-purchase-summary.component.scss'],
  imports: [CommonModule],
})
export class PurchaseSummaryComponent implements OnInit {
  fund!: Fund;
  quantity = 0;
  totalCost = 0;
  purchaseConfirmed = false;
  purchaseFailed = false;

  private ToastService = inject(ToastService);

  constructor(
    private router: Router,
    private transactionService: TransactionService
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { fund: Fund; quantity: number };
    if (state) {
      this.fund = state.fund;
      this.quantity = state.quantity;
      this.totalCost = this.quantity * this.fund.price;
    }
  }

  ngOnInit(): void {
    if (!this.fund) {
      // No fund info - redirect back
      this.router.navigate(['/funds']);
    }
  }

  confirmPurchase(): void {
    const success = this.transactionService.buyFund(
      this.fund.id,
      this.quantity
    );
    this.purchaseConfirmed = success;
    this.purchaseFailed = !success;

    if (success) {
      this.ToastService.show(
        `Purchased ${this.quantity} units of ${this.fund.name}`
      );
    } else {
      this.ToastService.show(`Failed to purchase ${this.fund.name}`);
    }

    // Redirect to receipt page with purchase outcome in router state
    this.router.navigate(['/receipt'], {
      state: {
        fund: this.fund,
        quantity: this.quantity,
        success: success,
      },
    });
  }

  cancelPurchase(): void {
    this.router.navigate(['/funds']);
  }
}
