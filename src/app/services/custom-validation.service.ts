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
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (control.value !== '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
      return {'email': true};
    }
    return null;
  }
}
