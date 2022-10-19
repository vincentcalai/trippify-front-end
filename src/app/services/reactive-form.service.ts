import { Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReactiveFormService{

  public readonly ALPHABET_SPACE= new RegExp(/^[A-Za-z][A-Za-z ]*$/);
  public readonly EMAIL = new RegExp(/^[_A-Za-z0-9\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/);
  public readonly NUMBERIC_DEC_REGEX = new RegExp(/^\d*\.?\d*$/);

  constructor(
    public fb: FormBuilder)
  { }


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
        totalBudget: [
          null, { validators: [Validators.required, Validators.pattern(this.NUMBERIC_DEC_REGEX), Validators.maxLength(9)] }
        ],
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
        destinations: this.fb.array([]),
      }
    );
  }

  initDestinationFormGrp(){
    return this.fb.group({
      ctryName:  [null, { validators: [Validators.required]}],
      cityName:  [null, { validators: [Validators.required]}],
      dateFrom: [null, { validators: [Validators.required]}],
      dateTo: [null, { validators: [Validators.required]}]
    },
    {
      validators: this.validateDateFromLaterThanDateTo()
    })
  }

  getBudgetFieldsControl(): FormControl {
    return this.fb.control({value: null, disabled: true}, { validators: [Validators.required, Validators.pattern(this.NUMBERIC_DEC_REGEX), Validators.maxLength(9)] });
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
        } else if (control instanceof FormGroup || control instanceof FormArray) {
          if (control instanceof FormArray) {
            this.markControlAsDirtyAndTouched(control);
          }
          this.displayValidationErrors(control);
        }
      });
    } else if (form instanceof FormArray) {
      form.controls.forEach(element => {
        this.displayValidationErrors(element);
      })
    }
  }

  markControlAsDirtyAndTouched(control: AbstractControl) {
    control.markAsTouched({ onlySelf: true });
    control.markAsDirty({ onlySelf: true });
  }

  validateDateFromLaterThanDateTo(): ValidationErrors {
    return (group: FormGroup): ValidationErrors => {

      let dateFrom = group.controls['dateFrom'];
      let dateTo = group.controls['dateTo'];

      if (dateFrom && dateFrom.valid && dateTo && dateTo.valid) {
        const dateFromValue = this.getMomentDateFormat(dateFrom.value);
        const dateToValue = this.getMomentDateFormat(dateTo.value);
        if (dateToValue.isBefore(dateFromValue, 'day')) {
          dateFrom.setErrors({dateToBeforeDateFromErr: true});
          dateTo.setErrors({dateToBeforeDateFromErr: true});
          return { dateToBeforeDateFromErr: true };
        }
      }
      return null;
    };
  }

  getMomentDateFormat(value: NgbDateStruct | string) {
    if (typeof value == 'object') {
      let date = moment().startOf('day'); // set time to 00:00:00
      date.set('year', value.year);
      date.set('month', value.month - 1);
      date.set('date', value.day);
      return date;
    } else {
      return moment(value, 'DD/MM/YYYY', true);
    }
  }


}
