import { createAction, props } from '@ngrx/store';

export const addTicket = createAction(
  '[Ticket] Add',
  props<{ title: string }>()
);
export const updateTicket = createAction(
  '[Ticket] Update',
  props<{ id: number; title: string }>()
);
export const deleteTicket = createAction(
  '[Ticket] Delete',
  props<{ id: number }>()
);
