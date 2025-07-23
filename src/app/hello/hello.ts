import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-hello",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="p-6 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 shadow transition-colors duration-500"
    >
      <p class="mb-2 text-lg text-green-900 dark:text-green-100">
        👋 Hello from a standalone component!
      </p>
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
        (click)="increment()"
      >
        Click me
      </button>
      <p class="mt-2 text-lg text-green-900 dark:text-green-100">
        You clicked {{ count }} times.
      </p>
    </div>
  `,
})
export class HelloComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
