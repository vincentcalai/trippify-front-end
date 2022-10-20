import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
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

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBudgetFormComponent);
    component = fixture.componentInstance;
    createTripBudgetForm = component.reactiveFormService.initializeCreateTripBudgetForm();
    fixture.detectChanges();
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
    console.log(component.totalBudget.valid);
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    component.computeBudget();
    expect(component.reactiveFormService.displayValidationErrors).withContext("validation should fail when total budget is null").toHaveBeenCalledTimes(1);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
