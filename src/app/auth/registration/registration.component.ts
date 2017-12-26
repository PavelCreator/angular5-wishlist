import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {

  hideValidation = true;

  username = new FormControl('', [
    Validators.required,
    Validators.maxLength(256)
  ]);

  email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.maxLength(256)
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(256)
  ]);

  confirmPassword = new FormControl('', [
    Validators.required
  ]);

  passwords: FormGroup = this.builder.group({
    password: this.password,
    confirmPassword: this.confirmPassword
  }, {validator: this.checkPasswords('password', 'confirmPassword')});

  regForm: FormGroup = this.builder.group({
    username: this.username,
    email: this.email,
    passwords: this.passwords
  });

  constructor(private builder: FormBuilder) {
  }

  checkPasswords(fieldName: string, secondFieldName: string) {
    return function (group: FormGroup) {
      const pass = group.controls[fieldName].value;
      const confirmPass = group.controls[secondFieldName].value;
      return pass === confirmPass ? null : {mismatchedPassword: true};
    };
  }

  register() {
    if (!this.regForm.valid) {
      this.hideValidation = false;
      console.log('form invalid');
    } else {
      console.log('form valid, this.regForm.value =', this.regForm.value);
    }
  }
}
