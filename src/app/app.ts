import { Component, computed, effect, inject, signal } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth-service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div
      [class.dark]="isDarkMode()"
      class="transition-colors duration-500 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans"
    >
      <div class="max-w-3xl mx-auto py-8 px-4">
        <h1 class="text-4xl font-bold text-center mb-8">
          ✨ Standalone Angular App ✨
        </h1>

        <nav class="flex justify-center gap-6 mb-6">
          <a
            routerLink="/hello"
            class="text-blue-600 hover:underline dark:text-blue-400"
            >Hello</a
          >
          <a
            routerLink="/about"
            class="text-blue-600 hover:underline dark:text-blue-400"
            >About</a
          >
          <a
            routerLink="/lazy"
            class="text-blue-600 hover:underline dark:text-blue-400"
            >Lazy</a
          >
        </nav>

        <div class="text-center mb-4 space-x-4">
          <button
            class="px-4 py-2 rounded text-white transition-colors duration-300"
            [ngClass]="
              isLoggedIn()
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            "
            (click)="toggleLogin()"
          >
            {{ isLoggedIn() ? "Logout" : "Login" }}
          </button>

          <button
            class="px-4 py-2 rounded text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
            (click)="toggleDarkMode()"
          >
            Toggle {{ isDarkMode() ? "Light" : "Dark" }} Mode
          </button>
        </div>

        <div
          *ngIf="toastMessage()"
          class="text-center mb-4 absolute top-0 left-0 right-0"
        >
          <div
            class="inline-block px-4 py-2 rounded bg-yellow-200 text-yellow-900 transition-opacity duration-500"
          >
            {{ toastMessage() }}
          </div>
        </div>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class AppComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  isLoggedIn = computed(() => this.auth.isLoggedIn());

  isDarkMode = signal(false);
  toastMessage = signal("");

  toggleLogin() {
    this.auth.toggle();
    const msg = this.isLoggedIn()
      ? "✅ You are now logged in."
      : "👋 You have logged out.";
    this.showToast(msg);

    if (!this.isLoggedIn()) {
      this.router.navigateByUrl("/hello");
    }
  }

  toggleDarkMode() {
    this.isDarkMode.set(!this.isDarkMode());
  }

  showToast(message: string) {
    this.toastMessage.set(message);
    setTimeout(() => this.toastMessage.set(""), 3000);
  }
}
