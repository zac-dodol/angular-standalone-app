import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { addTicket, deleteTicket, updateTicket } from '../state/ticket.actions';
import { selectTickets } from '../state/ticket.selector';
import { ToastService } from '../../services/toast.service';
import { Ticket } from '../state/ticket.reducer';

@Component({
  selector: 'ticket-form-ngrx',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-form-ngrx.component.html',
  styleUrls: ['./ticket-form-ngrx.component.scss'],
})
export class TicketFromNGRXComponent {
  tickets$: Observable<Ticket[]>;
  addForm: FormGroup;
  editForms: Record<number, FormGroup> = {};
  private toast = inject(ToastService);

  constructor(private store: Store, private fb: FormBuilder) {
    this.tickets$ = this.store.select(selectTickets);

    this.tickets$.pipe(takeUntilDestroyed()).subscribe((tickets) => {
      for (const t of tickets) {
        if (!this.editForms[t.id]) {
          this.editForms[t.id] = this.fb.group({
            title: new FormControl(t.title, Validators.required),
          });
        } else {
          this.editForms[t.id].setValue(
            { title: t.title },
            { emitEvent: false }
          );
          this.editForms[t.id].markAsPristine();
        }
      }
    });

    this.addForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  confirmAction(message: string): boolean {
    return confirm(message);
  }

  add() {
    const title = this.addForm.value.title.trim();
    if (title) {
      this.store.dispatch(addTicket({ title }));
      this.addForm.reset();
      this.toast.show('🎫 Ticket added successfully');
    }
  }

  update(id: number) {
    const control = this.editForms[id];
    const newTitle = control.value.title.trim();
    if (
      newTitle &&
      this.confirmAction('Are you sure you want to update this ticket?')
    ) {
      this.store.dispatch(updateTicket({ id, title: newTitle }));
      control.markAsPristine();
      this.toast.show('✏️ Ticket updated');
    }
  }

  revert(id: number, originalTitle: string) {
    this.editForms[id].setValue({ title: originalTitle });
    this.editForms[id].markAsPristine();
  }

  remove(id: number) {
    if (this.confirmAction('Are you sure you want to delete this ticket?')) {
      this.store.dispatch(deleteTicket({ id }));
      this.toast.show('🗑️ Ticket deleted');
    }
  }
}
