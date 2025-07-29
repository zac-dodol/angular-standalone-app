import { createAction, props } from '@ngrx/store';

export const addNotification = createAction(
  '[Notification] Add',
  props<{
    message: string;
    notificationType: 'info' | 'success' | 'error';
    timestamp?: Date;
  }>()
);

export const clearNotifications = createAction('[Notification] Clear All');
export const removeNotification = createAction(
  '[Notification] Remove',
  props<{ id: string }>()
);
