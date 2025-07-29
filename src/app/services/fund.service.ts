import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Fund } from '../models/fund.model';

@Injectable({ providedIn: 'root' })
export class FundService {
  private allFunds: Fund[] = [
    {
      id: 1,
      name: 'Global Growth Fund',
      ticker: 'GGF',
      price: 120,
      description: 'Focuses on global equities',
      risk: 'Medium',
      returns: 8,
      quantityOwned: 10,
    },
    {
      id: 2,
      name: 'Tech Innovators Fund',
      ticker: 'TIF',
      price: 200,
      description: 'Invests in tech startups',
      risk: 'High',
      returns: 15,
      quantityOwned: 5,
    },
    {
      id: 3,
      name: 'Conservative Income Fund',
      ticker: 'CIF',
      price: 100,
      description: 'Stable income oriented',
      risk: 'Low',
      returns: 4,
      quantityOwned: 20,
    },
  ];

  // This simulates the user portfolio (funds owned)
  private portfolioSubject = new BehaviorSubject<Fund[]>(
    this.allFunds.filter((f) => f.quantityOwned > 0)
  );
  portfolio$ = this.portfolioSubject.asObservable();

  getPortfolioFunds(): Observable<Fund[]> {
    return this.portfolio$;
  }

  getAllFunds(): Observable<Fund[]> {
    return of(this.allFunds);
  }

  getFundById(id: number): Fund | undefined {
    return this.allFunds.find((f) => f.id === id);
  }

  getNewFunds(): Observable<Fund[]> {
    return of(this.allFunds.filter((f) => f.quantityOwned === 0));
  }

  updateFundQuantity(fundId: number, newQuantity: number): void {
    const fund = this.allFunds.find((f) => f.id === fundId);
    if (fund) {
      fund.quantityOwned = newQuantity;
      this.portfolioSubject.next(
        this.allFunds.filter((f) => f.quantityOwned > 0)
      );
    }
  }
}
