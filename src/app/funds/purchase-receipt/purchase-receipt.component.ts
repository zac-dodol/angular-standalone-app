import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fund } from '../../models/fund.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase-receipt',
  templateUrl: './purchase-receipt.component.html',
  styleUrls: ['./purchase-receipt.component.scss'],
  imports: [CommonModule],
})
export class PurchaseReceiptComponent implements OnInit {
  private router = inject(Router);
  fund?: Fund;
  quantity: number = 0;
  totalCost: number = 0;
  success: boolean = false;

  constructor() {
    // Retrieve purchase result from router state or fallback
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as {
      fund: Fund;
      quantity: number;
      success: boolean;
    };

    if (state) {
      this.fund = state.fund;
      this.quantity = state.quantity;
      this.totalCost = this.quantity * this.fund.price;
      this.success = state.success;
    }
  }

  ngOnInit(): void {
    if (!this.fund) {
      // If no purchase data available, redirect to funds page or portfolio
      this.router.navigate(['/funds']);
    }
  }

  goToFundPage() {
    this.router.navigate(['/fund-manager']);
  }
}
