import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormArray, FormGroupDirective, ControlContainer } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Destinations } from 'src/app/model/destinations.model';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';
import { DestinationsComponent } from 'src/app/shared/destinations/destinations.component';
import { NgbDateCustomParserFormatter } from 'src/app/shared/formatter/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';

import { CreateTripDetailsFormComponent } from './create-trip-details-form.component';

describe('CreateTripDetailsFormComponent', () => {
  let component: CreateTripDetailsFormComponent;
  let fixture: ComponentFixture<CreateTripDetailsFormComponent>;
  let destinations: Destinations[] = [];
  let destination = new Destinations();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTripDetailsFormComponent ],
      imports: [
        RouterTestingModule,
        SharedModule,
        HttpClientTestingModule
      ],
      providers: [
        SharedVar,
        SharedMethods,
        DestinationsComponent,
        DatePipe,
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
        BsModalService,
        ReactiveFormService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTripDetailsFormComponent);
    component = fixture.componentInstance;
    component.sharedMethods.initializeCreateTripModel();

    destination.cityName = "New York";
    destination.ctryName = "United States";
    destination.dateFrom = {year: 2022, month: 10, day: 24};
    destination.dateTo = {year: 2022, month: 10, day: 31};
    destinations.push(destination);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit test case, with stored value and clicked prev page', () => {
    component.sharedVar.createTripModel.tripDetails.noOfDestinations = 1;
    component.sharedVar.createTripModel.tripDetails.destinations = destinations;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.staticQn2.value).toBe(1);
    expect(component.createTripDetailsForm.valid).toBe(true);
  });

  it('change staticQn2 value should save noOfDestination value into field', () => {
    component.ngOnInit();
    const noOfTripsEventSpy = spyOn(component.noOfTripsEvent, 'next');
    component.staticQn2.setValue(5);
    expect(component.sharedVar.createTripModel.tripDetails.noOfDestinations).toBe(5);
    expect(noOfTripsEventSpy).toHaveBeenCalled();
  });

  it('valid form input', () => {
    component.sharedVar.createTripModel.tripDetails.noOfDestinations = 1;
    component.sharedVar.createTripModel.tripDetails.destinations = destinations;
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(component, 'validateAllDates').and.returnValue(true);
    spyOn(component, 'navigateToPreviewPage');
    component.confirmClicked();
    expect(component.sharedVar.createTripModel.tripDetails.destinations[0].dateFromStr).toEqual('24/10/2022');
    expect(component.sharedVar.createTripModel.tripDetails.destinations[0].dateToStr).toEqual('31/10/2022');
    expect(component.sharedVar.createTripModel.tripDetails.destinations[0].dateFromDayName).toEqual('MON');
    expect(component.sharedVar.createTripModel.tripDetails.destinations[0].dateToDayName).toEqual('MON');
    expect(component.sharedVar.createTripModel.tripDetails.destinations[0].noOfTripDays).toEqual(8);
    expect(component.navigateToPreviewPage).toHaveBeenCalledTimes(1);
  });

  it('invalid form input - validate dates failed', () => {
    component.sharedVar.createTripModel.tripDetails.noOfDestinations = 1;
    component.sharedVar.createTripModel.tripDetails.destinations = destinations;
    component.ngOnInit();
    fixture.detectChanges();
    component.destinationsComponent['dateTo_error_0'] = 3;
    component.destinationsComponent['dateFrom_error_0'] = 3;
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    component.confirmClicked();
    expect(component.validateAllDates()).toEqual(false);
    expect(component.reactiveFormService.displayValidationErrors).toHaveBeenCalledTimes(1);
  });

  it('invalid form input - missing mandatory fields', () => {
    component.ngOnInit();
    fixture.detectChanges();
    component.destinationsComponent['dateTo_error_0'] = 0;
    component.destinationsComponent['dateFrom_error_0'] = 0;
    spyOn(component.reactiveFormService, 'displayValidationErrors');
    component.confirmClicked();
    expect(component.reactiveFormService.displayValidationErrors).toHaveBeenCalledTimes(1);
  });

  it('navigate to create preview page test', () => {
    spyOn(component.router, 'navigate');
    component.navigateToPreviewPage();
    expect(component.router.navigate).toHaveBeenCalledTimes(1);
  });

  it('navigate to back to create budget page test', () => {
    spyOn(component.router, 'navigate');
    component.backToBudgetScreen();
    expect(component.router.navigate).toHaveBeenCalledTimes(1);
  });
});

