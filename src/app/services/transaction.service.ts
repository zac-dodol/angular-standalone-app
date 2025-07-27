import { Injectable } from '@angular/core';
import { FundService } from './fund.service';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private fundService: FundService) {}

  buyFund(fundId: number, quantity: number): boolean {
    // Simple mock implementation
    const fund = this.fundService.getFundById(fundId);
    if (fund && quantity > 0) {
      const newQty = fund.quantityOwned + quantity;
      this.fundService.updateFundQuantity(fundId, newQty);
      return true;
    }
    return false;
  }

  sellFund(fundId: number, quantity: number): boolean {
    const fund = this.fundService.getFundById(fundId);
    if (fund && quantity > 0 && quantity <= fund.quantityOwned) {
      const newQty = fund.quantityOwned - quantity;
      this.fundService.updateFundQuantity(fundId, newQty);
      return true;
    }
    return false;
  }
}
