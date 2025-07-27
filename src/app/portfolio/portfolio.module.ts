import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { FundActionDialogComponent } from './fund-action-dialog/fund-action-dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PortfolioListComponent,
    FundActionDialogComponent,
  ],
  exports: [PortfolioListComponent],
})
export class PortfolioModule {}
