import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Notification } from '../state/notification.reducer';
import { selectAllNotifications } from '../state/notification.selector';
import {
  removeNotification,
  clearNotifications,
} from '../state/notification.actions';

@Component({
  selector: 'notification-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss'],
})
export class NotificationCenterComponent implements OnInit {
  private store = inject(Store);
  notifications$: Observable<Notification[]> = this.store.select(
    selectAllNotifications
  );

  ngOnInit(): void {
    this.store
      .select(selectAllNotifications)
      .subscribe((n) => console.log('🔔 Notifications:', n));
  }

  clearAll() {
    this.store.dispatch(clearNotifications());
  }

  remove(id: string) {
    this.store.dispatch(removeNotification({ id }));
  }
}
