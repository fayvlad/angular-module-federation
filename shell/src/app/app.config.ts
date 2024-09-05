import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {RemoteModulesModule} from "../remote-modules/remote-modules.module";
import {CommonModule} from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptorsFromDi()),RemoteModulesModule,CommonModule,provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
