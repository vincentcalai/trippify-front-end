import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReactiveFormService {

  public readonly ALPHABET_SPACE= new RegExp(/^[A-Za-z][A-Za-z ]*$/);
  public readonly EMAIL = new RegExp(/^[_A-Za-z0-9\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/);

  constructor(public fb: FormBuilder) { }

  initializeCreateTripForm() {
    return this.fb.group(
      {
        staticQn1: [null],
        name: [null,
          {
            validators: [
              Validators.required,
              Validators.pattern(this.ALPHABET_SPACE),
              Validators.maxLength(66)
            ]
          }
        ],
        email: [null,
            {
              validators: this.emailAddrValidators(),
              updateOn: 'blur'
            },
          ]
      }
    )
  }

  emailAddrValidators() {
    return [
      Validators.required,
      Validators.pattern(this.EMAIL),
      Validators.maxLength(100),
    ]
  }

  fieldErrorPrecedence(field: FormControl): string {
    if (!field.hasError('required')) {
      if (field.hasError('pattern')) {
        return 'pattern';
      } else if (field.hasError('maxlength')) {
        return 'maxlength';
      } else if (field.hasError('minlength')) {
        return 'minlength';
      }
    }
    return '';
  }

  fieldIsInvalid(field: AbstractControl): boolean {
    return field.invalid && !field.pristine && field.status !== 'PENDING' && field.errors != null;
  }
}
