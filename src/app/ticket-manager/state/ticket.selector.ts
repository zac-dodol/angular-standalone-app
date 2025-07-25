import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Ticket } from './ticket.reducer';

// Feature selector for the 'tickets' slice
export const selectTicketState = createFeatureSelector<Ticket[]>('tickets');

// Selector to get all tickets
export const selectTickets = createSelector(
  selectTicketState,
  (tickets) => tickets
);
