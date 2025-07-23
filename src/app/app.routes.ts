import { Routes } from "@angular/router";
import { HelloComponent } from "./hello/hello";
import { AboutComponent } from "./about/about";
import { authGuard } from "./auth-guard";

export const routes: Routes = [
  { path: "hello", component: HelloComponent },
  { path: "about", component: AboutComponent },
  {
    path: "lazy",
    canActivate: [authGuard],
    loadComponent: () => import("./lazy/lazy").then((m) => m.LazyComponent),
  },
  { path: "", redirectTo: "/hello", pathMatch: "full" },
];
