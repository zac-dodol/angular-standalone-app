import { Component, computed, inject } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "./auth-service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <div class="max-w-3xl mx-auto py-8 px-4">
        <h1 class="text-4xl font-bold text-center mb-8">
          ✨ Standalone Angular App ✨
        </h1>
        <nav class="flex justify-center gap-6 mb-6">
          <a routerLink="/hello" class="text-blue-600 hover:underline">Hello</a>
          <a routerLink="/about" class="text-blue-600 hover:underline">About</a>
          <a routerLink="/lazy" class="text-blue-600 hover:underline">Lazy</a>
        </nav>
        <div class="text-center mb-4">
          <button
            class="px-4 py-2 rounded text-white"
            [ngClass]="isLoggedIn() ? 'bg-red-500' : 'bg-green-500'"
            (click)="toggleLogin()"
          >
            {{ isLoggedIn() ? "Logout" : "Login" }}
          </button>
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

  toggleLogin() {
    this.auth.toggle();
    if (!this.isLoggedIn()) {
      this.router.navigateByUrl("/hello");
    }
  }
}
