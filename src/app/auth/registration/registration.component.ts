import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomValidationService } from './../../services/custom-validation.service';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  constructor(private builder: FormBuilder,
              private customValidationService: CustomValidationService) {
  }

  hideValidation = true;

  username = new FormControl('', [
    Validators.required,
    Validators.maxLength(256)
  ]);

  email = new FormControl('', [
    Validators.required,
    this.customValidationService.email,
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
  }, {
    validator: this.customValidationService.matchTwoFields('password', 'confirmPassword')
  });

  regForm: FormGroup = this.builder.group({
    username: this.username,
    email: this.email,
    passwords: this.passwords
  });

  register() {
    if (!this.regForm.valid) {
      this.hideValidation = false;
      console.log('form invalid');
    } else {
      console.log('form valid, this.regForm.value =', this.regForm.value);
    }
  }
}
