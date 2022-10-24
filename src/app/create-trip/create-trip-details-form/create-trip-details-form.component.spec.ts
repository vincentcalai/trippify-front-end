import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Destinations } from 'src/app/model/destinations.model';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';
import { NgbDateCustomParserFormatter } from 'src/app/shared/formatter/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';

import { CreateTripDetailsFormComponent } from './create-trip-details-form.component';

describe('CreateTripDetailsFormComponent', () => {
  let component: CreateTripDetailsFormComponent;
  let fixture: ComponentFixture<CreateTripDetailsFormComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit test case, with stored value and clicked prev page', () => {
    let destinations: Destinations[] = [];
    let destination = new Destinations();
    destination.cityName = "New York";
    destination.ctryName = "United States";
    destination.dateFrom = {year: 2022, month: 10, day: 24};
    destination.dateTo = {year: 2022, month: 10, day: 31};
    destination.dateFromDayName = 'MON';
    destination.dateToDayName = 'MON';
    destination.dateFromStr = '20221024';
    destination.dateToStr = '20221031';
    destination.noOfTripDays = 8;
    destinations.push(destination);

    component.sharedVar.createTripModel.tripDetails.noOfDestinations = 1;
    component.sharedVar.createTripModel.tripDetails.destinations = destinations;

    component.ngOnInit();

    fixture.detectChanges();
    expect(component.staticQn2.value).toBe(1);
    expect(component.createTripDetailsForm.valid).toBe(true);
  });
});
