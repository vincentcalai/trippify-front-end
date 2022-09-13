import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReactiveFormService {

  readonly ALPHANUMERIC = new RegExp(/^[A-Za-z\d]+$/);
  readonly EMAIL = new RegExp(/^[_A-Za-z0-9\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/);

  constructor(public fb: FormBuilder) { }

  initializeCreateTripForm() {
    return this.fb.group(
      {
        staticQn1: [null],
        name: [null,
          {
            validators: [
              Validators.required,
              Validators.pattern(this.ALPHANUMERIC),
              Validators.maxLength(66)
            ],
          }
        ],
        email: [null,
            {
              validators: this.emailAddrValidators()
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
}
