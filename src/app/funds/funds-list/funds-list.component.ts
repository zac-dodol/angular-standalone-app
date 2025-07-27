import { Component, OnInit } from '@angular/core';
import { Fund } from '../../models/fund.model';
import { FundService } from '../../services/fund.service';
import { Router } from '@angular/router';
import { FundDetailsDialogComponent } from '../fund-details-dialog/fund-details-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-funds-list',
  templateUrl: './funds-list.component.html',
  styleUrls: ['./funds-list.component.scss'],
  imports: [FundDetailsDialogComponent, CommonModule],
})
export class FundsListComponent implements OnInit {
  newFunds: Fund[] = [];
  selectedFund?: Fund;

  constructor(private fundService: FundService, private router: Router) {}

  ngOnInit(): void {
    this.fundService
      .getNewFunds()
      .subscribe((funds) => (this.newFunds = funds));
  }

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
