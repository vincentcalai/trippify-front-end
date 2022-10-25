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

import { ManageTripViewComponent } from './manage-trip-view.component';

describe('ManageTripViewComponent', () => {
  let component: ManageTripViewComponent;
  let fixture: ComponentFixture<ManageTripViewComponent>;
  let service: SharedMethods;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTripViewComponent ],
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
    fixture = TestBed.createComponent(ManageTripViewComponent);
    component = fixture.componentInstance;
    component.sharedMethods.initializedViewModel();
    service = TestBed.inject(SharedMethods);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retrieve all trip API', () => {
    spyOn(component.router, 'navigate');
    component.backToManageTripHomeScreen();
    expect(component.router.navigate).toHaveBeenCalledTimes(1);
  });

  it('ngOnInit unit test - input to be passed into model', () => {
    let destinations: Destinations[] = [];
    let destination = new Destinations();
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

    service.initializedViewModel();
    component.sharedVar.viewTripModel.particulars.name = "TEST USER";
    component.sharedVar.viewTripModel.budget.totalBudget = 20000;
    component.sharedVar.viewTripModel.tripDetails.noOfDestinations = 3;
    component.sharedVar.viewTripModel.tripDetails.destinations = destinations;
    component.ngOnInit();
    expect(component.particulars.name).toBe("TEST USER");
    expect(component.budget.totalBudget).toBe(20000);
    expect(component.tripDetails.noOfDestinations).toBe(3);
    expect(component.tripDetails.destinations.length).toBe(1);
  });
});
