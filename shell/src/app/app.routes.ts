

import { Routes } from '@angular/router';
import {HomeComponent} from "../home/home.component";
// @ts-ignore
declare module 'mfe1/Module';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'flights',// @ts-ignore
    loadChildren: () => import('mfe1/Module').then(m => m.FlightsModule)
  },
];
