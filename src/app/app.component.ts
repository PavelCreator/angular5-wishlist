import { Component } from '@angular/core';

@Component({
  selector: 'wl-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Wannado';
  description = 'Create your personal wish list';
  authenticated = false;
}
