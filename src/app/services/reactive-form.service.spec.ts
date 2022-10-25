import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';

import { ReactiveFormService } from './reactive-form.service';
import { SharedVar } from './shared-var.service';

describe('ReactiveFormService', () => {
  let service: ReactiveFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        SharedVar,
        FormBuilder,
      ]
    });
    service = TestBed.inject(ReactiveFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('init destination form group valid - trip date from is not later than date to', () => {
    let testFormGroup = service.initDestinationFormGrp();
    testFormGroup.get('ctryName').setValue('SINGAPORE');
    testFormGroup.get('cityName').setValue('SINGAPORE');
    testFormGroup.get('dateFrom').setValue('25/10/2022');
    testFormGroup.get('dateTo').setValue('31/10/2022');
    expect(testFormGroup.valid).toBe(true);
  });

  it('init destination form group invalid - trip date from is later than date to', () => {
    let testFormGroup = service.initDestinationFormGrp();
    testFormGroup.get('ctryName').setValue('SINGAPORE');
    testFormGroup.get('cityName').setValue('SINGAPORE');
    testFormGroup.get('dateFrom').setValue('31/10/2022');
    testFormGroup.get('dateTo').setValue('30/10/2022');
    expect(testFormGroup.valid).toBe(false);
  });

  it('displayValidationErrors test cases', () => {
    const mockFormControl = service.fb.control(null);
    const mockFormGroup = service.fb.group({
      mockControl1: service.fb.control(null),
      mockControl2: service.fb.control(null),
    });
    const mockFormGroupWithFormArray = service.fb.group({
      mockFormArray: service.fb.array([
        service.fb.group({ mockControl: service.fb.control(null) }),
        service.fb.group({ mockControl: service.fb.control(null) }),
      ])
    })
    expect(mockFormControl.dirty).toBe(false);
    expect(mockFormControl.touched).toBe(false);
    service.displayValidationErrors(mockFormControl);
    expect(mockFormControl.dirty).toBe(true);
    expect(mockFormControl.touched).toBe(true);

    for (const controlName in mockFormGroup.controls) {
      const formControl = mockFormGroup.get(controlName);
      expect(formControl.dirty).toBe(false);
      expect(formControl.touched).toBe(false);
    }
    service.displayValidationErrors(mockFormGroup);
    for (const controlName in mockFormGroup.controls) {
      const formControl = mockFormGroup.get(controlName);
      expect(formControl.dirty).toBe(true);
      expect(formControl.touched).toBe(true);
    }
    const formArr = mockFormGroupWithFormArray.get('mockFormArray') as FormArray;
    expect(formArr.dirty).toBe(false);
    expect(formArr.touched).toBe(false);
    service.displayValidationErrors(mockFormGroupWithFormArray);
    expect(formArr.dirty).toBe(true);
    expect(formArr.touched).toBe(true);
    formArr.controls.forEach(element => {
      expect(element.get('mockControl').dirty).toBe(true);
      expect(element.get('mockControl').touched).toBe(true);
    })
  });
});
