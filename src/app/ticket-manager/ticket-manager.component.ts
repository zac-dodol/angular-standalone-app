import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketFormSignalComponent } from './ticket-form-signal/ticket-form-signal.component';
import { TicketFromNGRXComponent } from './ticket-form-ngrx/ticket-form-ngrx.component';

@Component({
  selector: 'ticket-manager',
  standalone: true,
  imports: [CommonModule, TicketFormSignalComponent, TicketFromNGRXComponent],
  templateUrl: './ticket-manager.component.html',
  styleUrls: ['./ticket-manager.component.scss'],
})
export class TicketManagerComponent {}
