import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomValidationService {
  matchTwoFields(fieldName: string, secondFieldName: string) {
    return function (group: FormGroup) {
      const pass = group.controls[fieldName].value;
      const confirmPass = group.controls[secondFieldName].value;
      return pass === confirmPass ? null : {mismatchedPassword: true};
    };
  }

  email(control: FormGroup) {
    const EMAIL_REGEXP: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (control.value !== '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return {'email': true};
    }
    return null;
  }
}
