import { createReducer, on } from '@ngrx/store';
import { addTicket, updateTicket, deleteTicket } from './ticket.actions';

export interface Ticket {
  id: number;
  title: string;
}

export const initialState: Ticket[] = [];

let currentId = 0;

export const ticketReducer = createReducer(
  initialState,
  on(addTicket, (state, { title }) => [...state, { id: ++currentId, title }]),
  on(updateTicket, (state, { id, title }) =>
    state.map((t) => (t.id === id ? { ...t, title } : t))
  ),
  on(deleteTicket, (state, { id }) => state.filter((t) => t.id !== id))
);
