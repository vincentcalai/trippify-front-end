import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormArray, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, of } from 'rxjs';
import { CreateTripDetailsFormComponent } from 'src/app/create-trip/create-trip-details-form/create-trip-details-form.component';
import { Destinations } from 'src/app/model/destinations.model';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';
import { NgbDateCustomParserFormatter } from '../formatter/datepicker';
import { SharedModule } from '../shared.module';

import { DestinationsComponent } from './destinations.component';


describe('DestinationsComponent', () => {
  let component: DestinationsComponent;
  let fixture: ComponentFixture<DestinationsComponent>;
  let tripDetailsComponent: CreateTripDetailsFormComponent;

  const fg: FormGroup = new FormGroup({
    destinations: new FormArray([])
  });
  const fgd: FormGroupDirective = new FormGroupDirective(null, null);
  fgd.form = fg;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationsComponent ],
      imports: [
        RouterTestingModule,
        SharedModule,
        HttpClientTestingModule
      ],
      providers: [
        SharedVar,
        SharedMethods,
        CreateTripDetailsFormComponent,
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
        { provide: ControlContainer, useValue: fgd }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationsComponent);
    component = fixture.componentInstance;
    component.sharedMethods.initializeCreateTripModel();
    component.events = new BehaviorSubject<number>(0);
    tripDetailsComponent = TestBed.inject(CreateTripDetailsFormComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('validate all date in destinations component', () => {
  //   dataSetup(component);
  //   component.validateAllDate();
  //   expect(component['dateFrom_error_0']).toBe(0);
  //   expect(component['dateTo_error_0']).toBe(0);
  // });

  // it('validate from and to date in destinations component', () => {
  //   dataSetup(component);
  //   component.destinations.push(component.reactiveFormService.initDestinationFormGrp());
  //   component.getDestinationFormDateFrom(0).setErrors({"testErr" : true});
  //   component.getDestinationFormDateTo(0).setErrors({"testErr" : true});
  //   component['dateFrom_error_0'] = 0;
  //   component['dateTo_error_0'] = 0;
  //   component.validateDateFromAndTo(0);
  //   expect(component.getDestinationFormDateFrom(0).errors).toBe(null);
  //   expect(component.getDestinationFormDateTo(0).errors).toBe(null);
  // });

  it('initialise destination form when clicked previous page', () => {
    dataSetup(component);
    spyOn(component.sharedVar.destMap, 'get').and.returnValue(['New York', 'Boston', 'San Francisco', 'Miami']);
    component.initDestFormGroup(1);
    expect(component['dateFrom_error_0']).toBe(0);
    expect(component['dateTo_error_0']).toBe(0);
    expect(component.getDestinationFormCtryName(0).value).toBe("United States");
    expect(component.getDestinationFormCityName(0).value).toBe("New York");
    expect(component.getDestinationFormDateFrom(0).value).toEqual({ year: 2022, month: 10, day: 24 });
    expect(component.getDestinationFormDateTo(0).value).toEqual({ year: 2022, month: 10, day: 31 });
  });

  it('initialise destination form for new fresh form', () => {
    component.initDestFormGroup(3);
    expect(component.sharedVar.createTripModel.tripDetails.destinations.length).toBe(3);
    expect(component.sharedVar.createTripModel.tripDetails.destinations[0].ctryName).toBe(null);
    expect(component.sharedVar.createTripModel.tripDetails.destinations[0].cityName).toBe(null);
    expect(component.sharedVar.createTripModel.tripDetails.destinations[0].dateFrom).toBe(null);
    expect(component.sharedVar.createTripModel.tripDetails.destinations[0].dateTo).toBe(null);
  });

  it('ngOnInit unit test - initialise page for new fresh form, no. of trip to be 0', () => {
    component.ngOnInit();
    expect(component.sharedVar.createTripModel.tripDetails.destinations.length).toBe(0);
  });

  // it('validate "date from" value when not empty should have no error', () => {
  //   dataSetup(component);
  //   component.validateDateFrom(0);
  //   expect(component['dateFrom_error_0']).toBe(0);
  // });

  // it('validate "date to" value when not empty should have no error', () => {
  //   dataSetup(component);
  //   component.validateDateTo(0);
  //   expect(component['dateTo_error_0']).toBe(0);
  // });

  // it('validate change "date from" empty should show error', () => {
  //   component.initDestFormGroup(1);
  //   component.onChangeDateFrom(0);
  //   expect(component['dateFrom_error_0']).toBe(1);
  //   expect(component.getDestinationFormDateFrom(0).value).toEqual(null);
  // });

  // it('validate change "date to" empty should show error', () => {
  //   component.initDestFormGroup(1);
  //   component.onChangeDateTo(0);
  //   expect(component['dateTo_error_0']).toBe(1);
  //   expect(component.getDestinationFormDateTo(0).value).toEqual(null);
  // });

  it('change country on selection should save country and populate the cities of the country', () => {
    spyOn(component.sharedVar.destMap, 'get').and.returnValue(['New York', 'Boston', 'San Francisco', 'Miami']);
    component.initDestFormGroup(1);
    component.sharedVar.createTripModel.tripDetails.destinations[0].ctryName = 'United States';
    component.onChangeCtryDest(0, 'United States');
    expect(component.getDestinationFormCtryName(0).value).toEqual('United States');
    expect(component.cityListArray[0].length).toEqual(4);
  });

  it('save city on selection should save city in form', () => {
    spyOn(component.sharedVar.destMap, 'get').and.returnValue(['New York', 'Boston', 'San Francisco', 'Miami']);
    dataSetup(component);
    component.initDestFormGroup(1);
    component.sharedVar.createTripModel.tripDetails.destinations[0].cityName = 'Boston';
    component.onChangeCityDest(0, 'Boston');
    expect(component.getDestinationFormCityName(0).value).toEqual('Boston');
  });

  // it('validate date change fail when date from is later than date to', () => {
  //   spyOn(component.sharedVar.destMap, 'get').and.returnValue(['New York', 'Boston', 'San Francisco', 'Miami']);
  //   dataSetup(component);
  //   component.initDestFormGroup(1);
  //   component.sharedVar.createTripModel.tripDetails.destinations[0].dateFrom = { year: 2022, month: 11, day: 11 };
  //   component.onChangeDateFrom(0);
  //   expect(component.destinations.invalid).toBe(true);
  // });

  // it('validate date change fail when date format is incorrect', () => {
  //   spyOn(component.sharedVar.destMap, 'get').and.returnValue(['New York', 'Boston', 'San Francisco', 'Miami']);
  //   dataSetup(component);
  //   component.initDestFormGroup(1);
  //   component.sharedVar.createTripModel.tripDetails.destinations[0].dateFrom = { year: 2022, month: 11, day: 31 };
  //   component.onChangeDateFrom(0);

  //   expect(component.destinations.invalid).toBe(true);
  // });

  // it('validate date change fail when date format is incorrect 2', () => {
  //   spyOn(component.sharedVar.destMap, 'get').and.returnValue(['New York', 'Boston', 'San Francisco', 'Miami']);
  //   dataSetup(component);
  //   component.initDestFormGroup(1);
  //   component.sharedVar.createTripModel.tripDetails.destinations[0].dateFrom = { year: null, month: null, day: 11 };
  //   component.sharedVar.createTripModel.tripDetails.destinations[0].dateTo= { year: null, month: null, day: 1 };
  //   component.onChangeDateFrom(0);
  //   component.onChangeDateTo(0);
  //   expect(component.destinations.invalid).toBe(true);
  // });

  // it('validate date change fail when date format is incorrect 3', () => {
  //   spyOn(component.sharedVar.destMap, 'get').and.returnValue(['New York', 'Boston', 'San Francisco', 'Miami']);
  //   dataSetup(component);
  //   component.initDestFormGroup(1);
  //   component.sharedVar.createTripModel.tripDetails.destinations[0].dateFrom = { year: null, month: 11, day: 11 };
  //   component.sharedVar.createTripModel.tripDetails.destinations[0].dateTo= { year: null, month: 10, day: 11 };
  //   component.onChangeDateFrom(0);
  //   component.onChangeDateTo(0);
  //   expect(component.destinations.invalid).toBe(true);
  // });


});

function dataSetup(component) {
    let destinations: Destinations[] = [];
    let destination = new Destinations();
    component.sharedVar.createTripModel.particulars.isRegUser = true;
    component.sharedVar.createTripModel.particulars.name = "TEST USER";
    component.sharedVar.createTripModel.particulars.email = "TEST@TEST.COM";

    component.sharedVar.createTripModel.budget.isManualCal = true;
    component.sharedVar.createTripModel.budget.attractionBudget = 1000;
    component.sharedVar.createTripModel.budget.flightBudget = 1000;
    component.sharedVar.createTripModel.budget.foodBudget = 1000;
    component.sharedVar.createTripModel.budget.hotelBudget = 1000;
    component.sharedVar.createTripModel.budget.otherBudget = 1000;
    component.sharedVar.createTripModel.budget.transportBudget = 1000;
    component.sharedVar.createTripModel.budget.totalBudget = 6000;

    component.sharedVar.createTripModel.tripDetails.noOfDestinations = 1;

    destination.cityName = "New York";
    destination.ctryName = "United States";
    destination.dateFrom = {year: 2022, month: 10, day: 24};
    destination.dateTo = {year: 2022, month: 10, day: 31};
    destination.dateFromDayName = 'MON';
    destination.dateToDayName = 'MON';
    destination.dateFromStr = '24/10/2022';
    destination.dateToStr = '31/10/2022';
    destination.noOfTripDays = 8;
    destinations.push(destination);

    component.sharedVar.createTripModel.tripDetails.destinations = destinations;
}

