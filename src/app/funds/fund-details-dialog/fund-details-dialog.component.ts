import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Fund } from '../../models/fund.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fund-details-dialog',
  templateUrl: './fund-details-dialog.component.html',
  styleUrls: ['./fund-details-dialog.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class FundDetailsDialogComponent implements OnChanges {
  @Input() fund!: Fund;
  @Output() close = new EventEmitter<
    { fund: Fund; quantity: number } | undefined
  >();

  form: FormGroup;
  totalCost = 0;

  constructor(private fb: FormBuilder) {
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

  addToPortfolio(): void {
    if (this.form.invalid) return;

    this.close.emit({
      fund: this.fund,
      quantity: +this.form.get('quantity')?.value,
    });
  }

  cancel(): void {
    this.close.emit(undefined);
  }
}
