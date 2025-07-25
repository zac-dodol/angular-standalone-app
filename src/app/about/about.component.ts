import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="p-6 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 shadow transition-colors duration-500"
    >
      <p class="text-lg text-green-900 dark:text-green-100">
        📄 This is the About page from a standalone component.
      </p>
    </div>
  `,
})
export class AboutComponent {}
