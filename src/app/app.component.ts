import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MeuFooterComponent } from "./shared/components/meu-footer/meu-footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MeuFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ViajesApp';
}
