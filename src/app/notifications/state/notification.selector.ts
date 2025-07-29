import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Notification } from './notification.reducer';

export const selectNotificationState =
  createFeatureSelector<Notification[]>('notifications');

export const selectAllNotifications = createSelector(
  selectNotificationState,
  (state) =>
    [...state].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
);
