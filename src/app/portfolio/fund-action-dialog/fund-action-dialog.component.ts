import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Fund } from '../../models/fund.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-fund-action-dialog',
  templateUrl: './fund-action-dialog.component.html',
  styleUrls: ['./fund-action-dialog.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class FundActionDialogComponent implements OnChanges {
  @Input() fund!: Fund;
  @Input() action!: 'buy' | 'sell';
  @Output() close = new EventEmitter<boolean>();

  form: FormGroup;
  totalCost = 0;

  private toast = inject(ToastService);

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.form = this.fb.group({
      quantity: [
        1,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
    });

    this.form
      .get('quantity')
      ?.valueChanges.subscribe(() => this.calculateCost());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fund']) {
      this.form.reset({ quantity: 1 });
      this.calculateCost();
    }
  }

  calculateCost(): void {
    const qty = this.form.get('quantity')?.value || 0;
    this.totalCost = qty * this.fund.price;
  }

  confirm(): void {
    if (this.form.invalid) return;

    const qty = +this.form.get('quantity')?.value;
    let success = false;

    if (this.action === 'buy') {
      success = this.transactionService.buyFund(this.fund.id, qty);
    } else if (this.action === 'sell') {
      success = this.transactionService.sellFund(this.fund.id, qty);
    }

    if (success) {
      this.close.emit(true);
      if (this.action === 'buy') {
        this.toast.show(`Purchased ${qty} units of ${this.fund.name}`);
      } else if (this.action === 'sell') {
        this.toast.show(`Sold ${qty} units of ${this.fund.name}`);
      }
    } else {
      alert('Transaction failed. Please check quantity and try again.');
    }
  }

  cancel(): void {
    this.close.emit(false);
  }
}
