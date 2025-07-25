import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { addTicket, deleteTicket, updateTicket } from '../state/ticket.actions';
import { Ticket } from '../state/ticket.reducer';
import { selectTickets } from '../state/ticket.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'ticket-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-manager.component.html',
  styleUrls: ['./ticket-manager.component.scss'],
})
export class TicketManagerComponent {
  tickets$: Observable<Ticket[]>;
  addForm: FormGroup;
  editForms: Record<number, FormGroup> = {};

  constructor(private store: Store, private fb: FormBuilder) {
    this.tickets$ = this.store.select(selectTickets);
    this.addForm = this.fb.group({ title: '' });

    this.tickets$.subscribe((tickets) => {
      for (const t of tickets) {
        if (!this.editForms[t.id]) {
          this.editForms[t.id] = this.fb.group({
            title: new FormControl(t.title),
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
  }

  add() {
    const title = this.addForm.value.title.trim();
    if (title) {
      this.store.dispatch(addTicket({ title }));
      this.addForm.reset();
    }
  }

  update(id: number) {
    const control = this.editForms[id];
    const newTitle = control.value.title.trim();
    if (newTitle && confirm('Are you sure you want to update this ticket?')) {
      this.store.dispatch(updateTicket({ id, title: newTitle }));
      control.markAsPristine();
    }
  }

  revert(id: number, originalTitle: string) {
    this.editForms[id].setValue({ title: originalTitle });
    this.editForms[id].markAsPristine();
  }

  remove(id: number) {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.store.dispatch(deleteTicket({ id }));
    }
  }
}
