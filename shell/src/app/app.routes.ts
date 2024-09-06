import { Routes } from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {loadRemoteModule} from "@angular-architects/native-federation";

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },

  // Add this route:
  {
    path: 'flights',
    loadComponent: () =>
      loadRemoteModule('mfe1', './Component').then((m) => m.AppComponent),
  },
];
