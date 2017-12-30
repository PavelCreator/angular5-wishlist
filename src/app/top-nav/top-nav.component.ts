import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wl-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})

export class TopNavComponent {

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
