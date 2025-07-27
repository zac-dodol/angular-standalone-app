import { NgModule } from '@angular/core';
import { FundsListComponent } from './funds-list/funds-list.component';
import { FundDetailsDialogComponent } from './fund-details-dialog/fund-details-dialog.component';
import { PurchaseSummaryComponent } from './fund-purchase-summary/fund-purchase-summary.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    FundsListComponent,
    FundDetailsDialogComponent,
    PurchaseSummaryComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FundsListComponent, PurchaseSummaryComponent],
})
export class FundsModule {}
