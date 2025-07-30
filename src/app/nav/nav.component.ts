import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth-service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  private auth = inject(AuthService);
  isLoggedIn = computed(() => this.auth.isLoggedIn());
  private toast = inject(ToastService);

  logout() {
    this.auth.logout();
    this.toast.show('👋 You have logged out.');
  }
}
