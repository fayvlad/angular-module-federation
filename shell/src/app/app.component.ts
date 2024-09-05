import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RemoteModulesModule} from "../remote-modules/remote-modules.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RemoteModulesModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'shell';
}
