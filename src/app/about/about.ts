import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 border border-gray-300 rounded-md bg-white shadow">
      <p class="text-lg">
        📄 This is the About page from a standalone component.
      </p>
    </div>
  `,
})
export class AboutComponent {}
