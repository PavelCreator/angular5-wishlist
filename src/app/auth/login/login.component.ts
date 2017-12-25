import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  showValidation = false;
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  loginForm: FormGroup;

  constructor(private builder: FormBuilder) {
  }

  onChanges(): void {
    this.loginForm.valueChanges.subscribe(val => {
      this.showValidation = false;
    });
  }

  ngOnInit() {
    this.loginForm = this.builder.group({
      email: this.email,
      password: this.password
    });
    this.onChanges();
  }

  login() {
    if (!this.loginForm.valid) {
      this.showValidation = true;
      console.log('form invalid');
    } else {
      console.log('form valid, this.loginForm.value =', this.loginForm.value);
    }
  }
}
