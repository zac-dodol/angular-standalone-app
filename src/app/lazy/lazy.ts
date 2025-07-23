import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-lazy",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 border border-green-400 rounded-md bg-green-50 shadow">
      <p class="text-lg text-green-900">
        🛡️ This is a lazily loaded component protected by a route guard.
      </p>
    </div>
  `,
})
export class LazyComponent {}
