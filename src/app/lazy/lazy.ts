import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-lazy",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="p-6 border border-green-400 dark:border-green-600 rounded-md bg-green-50 dark:bg-green-900 shadow transition-colors duration-500"
    >
      <p class="text-lg text-green-900 dark:text-green-100">
        🛡️ This is a lazily loaded component protected by a route guard.
      </p>
    </div>
  `,
})
export class LazyComponent {}
