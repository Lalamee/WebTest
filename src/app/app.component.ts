import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SmartFilterComponent } from './smart-filter/smart-filter.component'; // Импортируем компонент

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SmartFilterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebTest';
}
