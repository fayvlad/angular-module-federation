

import { Routes } from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {RemoteModuleLoader} from "../remote-modules/remote-module-loader.service";
import {AppComponent} from "./app.component";
// @ts-ignore
declare module 'mfe1/Module';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full'
  },{
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  // {
  //   path: 'flights',// @ts-ignore
  //   loadChildren: () => import('mfe1/Module').then(m => m.FlightsModule)
  // },
  {
    path: 'flights',
    loadChildren: () => RemoteModuleLoader.loadRemoteModule('mfe1/Module', {
      manifest: '/mfe1/manifest',
      file: 'mfe1.js'
    }).then(m => m.FlightsModule)
  },
];
