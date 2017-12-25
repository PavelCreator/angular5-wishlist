import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  showValidation = false;
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required]);
  registerForm: FormGroup;

  constructor(private builder: FormBuilder) {
  }

  onChanges(): void {
    this.registerForm.valueChanges.subscribe(val => {
      this.showValidation = false;
    });
  }

  ngOnInit() {
    this.registerForm = this.builder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
    this.onChanges();
  }

  register() {
    if (!this.registerForm.valid) {
      this.showValidation = true;
      console.log('form invalid');
    } else {
      console.log('form valid, this.registerForm.value =', this.registerForm.value);
    }
  }
}
