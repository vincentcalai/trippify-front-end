import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';
import { NgbDateCustomParserFormatter } from 'src/app/shared/formatter/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';

import { CreateBudgetFormComponent } from './create-budget-form.component';

describe('CreateBudgetFormComponent', () => {
  let component: CreateBudgetFormComponent;
  let fixture: ComponentFixture<CreateBudgetFormComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBudgetFormComponent ],
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

  let createTripBudgetForm = null;
  let service: SharedMethods;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBudgetFormComponent);
    component = fixture.componentInstance;
    createTripBudgetForm = component.reactiveFormService.initializeCreateTripBudgetForm();
    fixture.detectChanges();
    service = TestBed.inject(SharedMethods);
    el = fixture.debugElement;
  });

  it('ngOnInit test case, with stored value and clicked prev page', () => {
    service.initializeCreateTripModel();
    component.sharedVar.createTripModel.budget.isManualCal = true;
    component.sharedVar.createTripModel.budget.attractionBudget = 1000;
    component.sharedVar.createTripModel.budget.flightBudget = 1000;
    component.sharedVar.createTripModel.budget.foodBudget = 1000;
    component.sharedVar.createTripModel.budget.hotelBudget = 1000;
    component.sharedVar.createTripModel.budget.otherBudget = 1000;
    component.sharedVar.createTripModel.budget.transportBudget = 1000;
    component.sharedVar.createTripModel.budget.totalBudget = 6000;

    component.ngOnInit();

    fixture.detectChanges();
    expect(component.createTripBudgetForm.valid).toBe(true);
  });

  it('when auto calculation, total budget to be enabled, others disabled', () => {
    service.initializeCreateTripModel();
    component.isManualCalEnabled = false;
    component.onManualSwitchChange();
    expect(el.nativeElement.querySelector('#total_budget_0').disabled).toBeFalsy();
    expect(el.nativeElement.querySelector('#flight_budget_0').disabled).toBeTruthy();
    expect(el.nativeElement.querySelector('#hotel_budget_0').disabled).toBeTruthy();
    expect(el.nativeElement.querySelector('#transport_budget_0').disabled).toBeTruthy();
    expect(el.nativeElement.querySelector('#attraction_budget_0').disabled).toBeTruthy();
    expect(el.nativeElement.querySelector('#food_budget_0').disabled).toBeTruthy();
    expect(el.nativeElement.querySelector('#other_budget_0').disabled).toBeTruthy();
  });

  it('when manual calculation, total budget to be disabled, others enabled', () => {
    service.initializeCreateTripModel();
    component.isManualCalEnabled = true;
    component.onManualSwitchChange();
    expect(el.nativeElement.querySelector('#total_budget_0').disabled).toBeTruthy();
    expect(el.nativeElement.querySelector('#flight_budget_0').disabled).toBeFalsy();
    expect(el.nativeElement.querySelector('#hotel_budget_0').disabled).toBeFalsy();
    expect(el.nativeElement.querySelector('#transport_budget_0').disabled).toBeFalsy();
    expect(el.nativeElement.querySelector('#attraction_budget_0').disabled).toBeFalsy();
    expect(el.nativeElement.querySelector('#food_budget_0').disabled).toBeFalsy();
    expect(el.nativeElement.querySelector('#other_budget_0').disabled).toBeFalsy();
  });

  it('manual calculation total budget should be 9000', () => {
    component.attractionBudget.setValue(1000);
    component.flightBudget.setValue(2000);
    component.foodBudget.setValue(1500);
    component.hotelBudget.setValue(1500);
    component.otherBudget.setValue(2000);
    component.transportBudget.setValue(1000);

    component.addUpTotalBudget();

    expect(component.totalBudget.value).toBe('9000.00');
  });

  it('auto calculation total budget 10000 to be distributed correctly according to fixed percentage', () => {
    component.totalBudget.clearValidators();

    component.totalBudget.setValue(10000);
    component.computeBudget();

    expect(component.attractionBudget.value).withContext("attraction budget should be 1000.00").toBe('1000.00');
    expect(component.flightBudget.value).withContext("attraction budget should be 1000.00").toBe('4000.00');
    expect(component.foodBudget.value).withContext("attraction budget should be 1000.00").toBe('750.00');
    expect(component.hotelBudget.value).withContext("attraction budget should be 1000.00").toBe('3000.00');
    expect(component.otherBudget.value).withContext("attraction budget should be 1000.00").toBe('500.00');
    expect(component.transportBudget.value).withContext("attraction budget should be 1000.00").toBe('750.00');
  });

  it('form should be invalid when total budget is empty', () => {
    component.totalBudget.setValue(null);
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    component.computeBudget();
    expect(component.reactiveFormService.displayValidationErrors).withContext("validation should fail when total budget is null").toHaveBeenCalledTimes(1);
  });

  it('form should be invalid when is auto calculation and budget is not computed', () => {
    component.ngOnInit();
    component.totalBudget.setValue(20000);
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    component.confirmClicked();
    expect(component.showNotComputedError).toBeTrue;
    expect(component.reactiveFormService.displayValidationErrors).withContext("should fail when budget is not computed").toHaveBeenCalledTimes(1);
  });

  it('form should be valid when is auto calculation and budget is computed', () => {
    service.initializeCreateTripModel();
    component.ngOnInit();
    component.totalBudget.setValue(20000);
    component.computeBudget();
    spyOn(component, 'navigateToTripDetailsPage');
    component.isManualCalEnabled = false;
    component.confirmClicked();
    expect(component.showNotComputedError).toBeFalse;
    expect(component.navigateToTripDetailsPage).withContext("should navigate too trip details page").toHaveBeenCalledTimes(1);
  });

  it('form should be valid for manual calculation', () => {
    service.initializeCreateTripModel();
    component.ngOnInit();
    component.attractionBudget.setValue(1000);
    component.flightBudget.setValue(2000);
    component.foodBudget.setValue(1500);
    component.hotelBudget.setValue(1500);
    component.otherBudget.setValue(2000); 
    component.transportBudget.setValue(1000);
    spyOn(component, 'navigateToTripDetailsPage');
    component.isManualCalEnabled = true;
    component.showNotComputedError = false;
    component.confirmClicked();
    expect(component.showNotComputedError).toBeFalse;
    expect(component.navigateToTripDetailsPage).withContext("should navigate too trip details page").toHaveBeenCalledTimes(1);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
