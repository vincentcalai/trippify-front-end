import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';
import { NgbDateCustomParserFormatter } from 'src/app/shared/formatter/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';

import { CreateParticularFormComponent } from './create-particular-form.component';

describe('CreateParticularFormComponent', () => {
  let component: CreateParticularFormComponent;
  let fixture: ComponentFixture<CreateParticularFormComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateParticularFormComponent ],
      imports: [
        RouterTestingModule,
        SharedModule,
        HttpClientTestingModule
      ],
      providers: [
        SharedVar,
        SharedMethods,
        DatePipe,
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
        BsModalService,
        ReactiveFormService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParticularFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit test case, with stored value and clicked prev page', () => {
    component.sharedMethods.initializeCreateTripModel();
    component.sharedVar.createTripModel.particulars.isRegUser = true;
    component.sharedVar.createTripModel.particulars.name = "TEST USER";
    component.sharedVar.createTripModel.particulars.email = "TEST@TEST.COM";

    component.ngOnInit();

    fixture.detectChanges();
    expect(component.createTripParticularForm.valid).toBe(true);
  });

  it('email disabled when registered user selects a name', () => {
    component.ngOnInit();
    component.staticQn1.setValue("YES");
    component.name.setValue("TESTUSER");
    fixture.detectChanges();
    expect(el.nativeElement.querySelector('#email_0').disabled).toBeTruthy();
  });

  it('name and email enabled when user selects non-registered user', () => {
    component.ngOnInit();
    component.staticQn1.setValue("NO");
    fixture.detectChanges();
    expect(el.nativeElement.querySelector('#name_0').disabled).toBeFalsy();
    expect(el.nativeElement.querySelector('#email_0').disabled).toBeFalsy();
  });

  it('enable/disable email input field when user is registered', () => {
    component.ngOnInit();
    component.staticQn1.setValue("YES");
    fixture.detectChanges();
    expect(el.nativeElement.querySelector('#email_0').disabled).toBeTruthy();
    component.staticQn1.setValue("NO");
    fixture.detectChanges();
    expect(el.nativeElement.querySelector('#email_0').disabled).toBeFalsy();
  });

  it('invalid form input, empty staticQn1 value', () => {
    component.sharedMethods.initializeCreateTripModel();
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.createTripParticularForm.valid).toBe(false);
    component.confirmClicked();
    expect(component.reactiveFormService.displayValidationErrors).toHaveBeenCalledTimes(1);
  });
  
  it('invalid form input, empty name', () => {
    component.sharedMethods.initializeCreateTripModel();
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    component.ngOnInit();
    component.staticQn1.setValue("YES");
    component.name.setValue(null);
    fixture.detectChanges();
    expect(component.createTripParticularForm.valid).toBe(false);
    component.confirmClicked();
    expect(component.reactiveFormService.displayValidationErrors).toHaveBeenCalledTimes(1);
  });

  it('invalid form input, empty email', () => {
    component.sharedMethods.initializeCreateTripModel();
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    component.ngOnInit();
    component.staticQn1.setValue("NO");
    component.name.setValue("TESTUSER");
    fixture.detectChanges();
    expect(component.createTripParticularForm.valid).toBe(false);
    component.confirmClicked();
    expect(component.reactiveFormService.displayValidationErrors).toHaveBeenCalledTimes(1);
  });

  it('invalid form input, invalid email validation', () => {
    component.sharedMethods.initializeCreateTripModel();
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    component.ngOnInit();
    component.staticQn1.setValue("NO");
    component.name.setValue("TESTUSER");
    component.email.setValue("AAAAA");
    fixture.detectChanges();
    expect(component.createTripParticularForm.valid).toBe(false);
    component.confirmClicked();
    expect(component.reactiveFormService.displayValidationErrors).toHaveBeenCalledTimes(1);
  });

  it('valid form input - registered user', () => {
    component.sharedMethods.initializeCreateTripModel();
    spyOn(component, 'navigateToBudgetPage');
    component.ngOnInit();
    component.staticQn1.setValue("YES");
    component.name.setValue("TEST USER");
    component.email.setValue("TEST@TEST.COM");
    fixture.detectChanges();
    expect(component.createTripParticularForm.valid).toBe(true);
    component.confirmClicked();
    expect(component.navigateToBudgetPage).toHaveBeenCalledTimes(1);
  });

  it('valid form input - unregistered user', () => {
    component.sharedMethods.initializeCreateTripModel();
    spyOn(component, 'navigateToBudgetPage');
    component.ngOnInit();
    component.staticQn1.setValue("NO");
    component.name.setValue("TEST USER");
    component.email.setValue("TEST@TEST.COM");
    fixture.detectChanges();
    expect(component.createTripParticularForm.valid).toBe(true);
    component.confirmClicked();
    expect(component.navigateToBudgetPage).toHaveBeenCalledTimes(1);
  });

});
