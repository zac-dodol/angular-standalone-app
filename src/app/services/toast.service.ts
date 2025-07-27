import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toastMessage = signal('');

  show(message: string) {
    this.toastMessage.set(message);
    setTimeout(() => this.toastMessage.set(''), 3000);
  }
}
