import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ticket-form-signal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './ticket-form-signal.component.html',
  styleUrls: ['./ticket-form-signal.component.scss'],
})
export class TicketFormSignalComponent {
  private toast = inject(ToastService);

  tickets = signal<{ id: number; title: string }[]>([]);
  newTicket = signal('');
  editingId = signal<number | null>(null);
  updatedTitle = signal('');

  addTicket() {
    const title = this.newTicket().trim();
    if (!title) return;
    const id = Date.now();
    this.tickets.update((t) => [...t, { id, title }]);
    this.toast.show('🎫 Ticket added successfully');
    this.newTicket.set('');
  }

  editTicket(id: number, currentTitle: string) {
    this.editingId.set(id);
    this.updatedTitle.set(currentTitle);
  }

  updateTicket(id: number) {
    const newTitle = this.updatedTitle().trim();
    if (!newTitle) return;
    this.tickets.update((t) =>
      t.map((ticket) =>
        ticket.id === id ? { ...ticket, title: newTitle } : ticket
      )
    );
    this.toast.show('✏️ Ticket updated');
    this.editingId.set(null);
    this.updatedTitle.set('');
  }

  deleteTicket(id: number) {
    this.tickets.update((t) => t.filter((ticket) => ticket.id !== id));
    this.toast.show('🗑️ Ticket deleted');
  }

  cancelEdit() {
    this.editingId.set(null);
    this.updatedTitle.set('');
  }

  isEditing = computed(() => this.editingId() !== null);
}
