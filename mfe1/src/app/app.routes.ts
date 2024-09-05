import {Routes} from '@angular/router';
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      {
        path: 'flights-search',
        loadChildren: () =>
          import('../flights/flights.module').then(
            m => m.FlightsModule,
          ),
      },
    ]
  },
];
