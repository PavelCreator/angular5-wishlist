import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

function duplicatePassword(fieldName: string, secondFieldName: string) {
  return function (input: any) {
    if (!input.root || !input.root.controls) {
      return null;
    }
    const exactMatch = input.root.controls[fieldName].value === input.root.controls[secondFieldName].value;
    if (exactMatch) {
      input.root.controls[fieldName].value = input.root.controls[secondFieldName].value;
      // input.root.controls[secondFieldName].value = true;
    }
    console.log("input.root.controls =", input.root.controls);
    return exactMatch ? null : {mismatchedPassword: true};
  };
}

@Component({
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

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
    Validators.maxLength(256),
    duplicatePassword('password', 'confirmPassword')
  ]);

  confirmPassword = new FormControl('', [
    Validators.required,
    duplicatePassword('password', 'confirmPassword')
  ]);
  regForm: FormGroup;

  constructor(private builder: FormBuilder) {
  }

  onChanges(): void {
    /*this.regForm.valueChanges.subscribe(val => {
      this.hideValidation = true;
    });*/
  }

  ngOnInit() {
    this.regForm = this.builder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
    this.onChanges();
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
