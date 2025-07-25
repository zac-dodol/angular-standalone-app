import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  isLoggedIn = computed(() => this.auth.isLoggedIn());
  title = 'standalone-demo';

  isDarkMode = signal(false);
  toastMessage = signal('');

  toggleLogin() {
    this.auth.toggle();
    const msg = this.isLoggedIn()
      ? '✅ You are now logged in.'
      : '👋 You have logged out.';
    this.showToast(msg);

    if (!this.isLoggedIn()) {
      this.router.navigateByUrl('/hello');
    }
  }

  toggleDarkMode() {
    this.isDarkMode.set(!this.isDarkMode());
  }

  showToast(message: string) {
    this.toastMessage.set(message);
    setTimeout(() => this.toastMessage.set(''), 3000);
  }
}
