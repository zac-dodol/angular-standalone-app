import { createReducer, on } from '@ngrx/store';
import {
  addNotification,
  clearNotifications,
  removeNotification,
} from './notification.actions';
import { v4 as uuidv4 } from 'uuid';

export interface Notification {
  id: string;
  message: string;
  notificationType: 'info' | 'success' | 'error';
  timestamp: Date;
}

export const initialState: Notification[] = [];

export const notificationReducer = createReducer(
  initialState,
  on(addNotification, (state, { message, notificationType, timestamp }) => [
    ...state,
    {
      id: uuidv4(),
      message,
      notificationType,
      timestamp: timestamp || new Date(),
    },
  ]),
  on(clearNotifications, () => []),
  on(removeNotification, (state, { id }) => state.filter((n) => n.id !== id))
);
