import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReactiveFormService {

  public readonly ALPHABET_SPACE= new RegExp(/^[A-Za-z][A-Za-z ]*$/);
  public readonly EMAIL = new RegExp(/^[_A-Za-z0-9\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/);
  public readonly NUMBERIC_DEC_REGEX = new RegExp(/^\d*\.?\d*$/);

  constructor(public fb: FormBuilder) { }

  initializeCreateTripParticularForm() {
    return this.fb.group(
      {
        staticQn1: this.getBasicRequiredControl(),
        name: this.fb.control(null,
                {
                  validators: [
                    Validators.required,
                    Validators.pattern(this.ALPHABET_SPACE),
                    Validators.maxLength(66)
                  ]
                }),
        email: this.fb.control(null, {
                    validators: this.emailAddrValidators(),
                    updateOn: 'blur'
                })
      }
    )
  }

  initializeCreateTripBudgetForm(){
    return this.fb.group(
      {
        totalBudget: this.getBudgetFieldsControl(),
        flightBudget: this.getBudgetFieldsControl(),
        hotelBudget: this.getBudgetFieldsControl(),
        transportBudget: this.getBudgetFieldsControl(),
        attractionBudget: this.getBudgetFieldsControl(),
        foodBudget: this.getBudgetFieldsControl(),
        otherBudget: this.getBudgetFieldsControl()
      }
    );
  }

  initializeCreateTripDetailsForm() {
    return this.fb.group(
      {
        staticQn2: this.getBasicRequiredControl(),
        destinations: this.getBasicRequiredControl(),
        dateFrom: this.getBasicRequiredControl(),
        dateTo: this.getBasicRequiredControl()
      }
    );
  }

  getBudgetFieldsControl(): FormControl {
    return this.fb.control(null, { validators: [Validators.required, Validators.pattern(this.NUMBERIC_DEC_REGEX), Validators.maxLength(9)] });
  }

  getBasicRequiredControl(): FormControl {
    return this.fb.control(null, { validators: [Validators.required]});
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

  displayValidationErrors(form: AbstractControl) {
    if (form instanceof FormControl) {
      this.markControlAsDirtyAndTouched(form);
    } else if (form instanceof FormGroup) {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        if (control instanceof FormControl) {
          this.markControlAsDirtyAndTouched(control);
        } else if (control instanceof FormGroup) {
          this.displayValidationErrors(control);
        }
      });
    }
  }

  markControlAsDirtyAndTouched(control: AbstractControl) {
    control.markAsTouched({ onlySelf: true });
    control.markAsDirty({ onlySelf: true });
  }
}
