import { Component, OnInit } from '@angular/core';
import { Fund } from '../../models/fund.model';
import { FundService } from '../../services/fund.service';
import { FundActionDialogComponent } from '../fund-action-dialog/fund-action-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss'],
  imports: [FundActionDialogComponent, CommonModule],
})
export class PortfolioListComponent implements OnInit {
  funds: Fund[] = [];
  selectedFund?: Fund;
  selectedAction?: 'buy' | 'sell';

  constructor(private fundService: FundService) {}

  ngOnInit(): void {
    this.fundService
      .getPortfolioFunds()
      .subscribe((funds) => (this.funds = funds));
  }

  openBuySellDialog(fund: Fund, action: 'buy' | 'sell'): void {
    this.selectedFund = fund;
    this.selectedAction = action;
  }

  closeDialog(confirmed: boolean): void {
    this.selectedFund = undefined;
    this.selectedAction = undefined;
    if (confirmed) {
      // Optionally reload portfolio
      this.fundService
        .getPortfolioFunds()
        .subscribe((funds) => (this.funds = funds));
    }
  }
}
