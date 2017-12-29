import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hideValidation = true;
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(private builder: FormBuilder) {
  }

  loginForm: FormGroup = this.builder.group({
    email: this.email,
    password: this.password
  });

  login() {
    if (!this.loginForm.valid) {
      this.hideValidation = false;
      console.log('form invalid');
    } else {
      console.log('form valid, this.loginForm.value =', this.loginForm.value);
    }
  }
}
