import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'wl-app',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Wannado';
  description = 'Create your personal wish list';
  authenticated = false;

  constructor(private router: Router) {
  }

  clickLogo() {
    if (!this.authenticated) {
      this.router.navigate(['/list']);
    }
  }
}
