import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlightsComponent} from "./flights.component";
import {RouterModule, Routes} from "@angular/router";

export const FLIGHTS_ROUTES: Routes = [
  {
    path: '',
    component: FlightsComponent
  }
];

@NgModule({
  declarations: [FlightsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(FLIGHTS_ROUTES)
  ]
})
export class FlightsModule { }
