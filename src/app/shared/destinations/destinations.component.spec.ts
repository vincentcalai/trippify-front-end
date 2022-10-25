import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormArray, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
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
        DatePipe,
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
        BsModalService,
        ReactiveFormService,
        ControlContainer
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationsComponent);
    component = fixture.componentInstance;
    component.sharedMethods.initializeCreateTripModel();
    component.events = new BehaviorSubject<number>(3);
    fixture.detectChanges();
    dataSetup(component);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate all date in destinations component', () => {
    component.validateAllDate();
    expect(component['dateFrom_error_0']).toBe(0);
    expect(component['dateTo_error_0']).toBe(0);
  });

  xit('validate from and to date in destinations component', () => {
    //ERROR here! - COULD NOT GET component.destinations BELOW!
    component.destinations.setValue(component.sharedVar.createTripModel.tripDetails.destinations);
    fixture.detectChanges();
    component['dateFrom_error_0'] = 0;
    component['dateTo_error_0'] = 0;
    component.validateDateFromAndTo(0);
    expect(component.getDestinationFormDateFrom(0).errors).toBe(null);
    expect(component.getDestinationFormDateTo(0).errors).toBe(null);
  });

  xit('initialise destination form when clicked previous page', () => {
    //ERROR here! - COULD NOT GET component.destinations in initDestFormGroup!
    component.initDestFormGroup(1);
    expect(component['dateFrom_error_0']).toBe(0);
    expect(component['dateTo_error_0']).toBe(0);
  });


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

