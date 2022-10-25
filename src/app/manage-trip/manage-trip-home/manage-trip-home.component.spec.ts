import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { BudgetModel } from 'src/app/model/budget.model';
import { Destinations } from 'src/app/model/destinations.model';
import { ParticularsModel } from 'src/app/model/particulars.model';
import { TripDetailsModel } from 'src/app/model/trip-details.model';
import { ViewTripModel } from 'src/app/model/view-trip.model';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';
import { NgbDateCustomParserFormatter } from 'src/app/shared/formatter/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';

import { ManageTripHomeComponent } from './manage-trip-home.component';

describe('ManageTripHomeComponent', () => {
  let component: ManageTripHomeComponent;
  let fixture: ComponentFixture<ManageTripHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTripHomeComponent ],
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
    fixture = TestBed.createComponent(ManageTripHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retrieve all trip API', () => {
    spyOn(component.apiService, 'getAllTrips').and.returnValue(of({"tripList": [], "statusCode": 0, "resultMessage": ''}));
    component.retrieveAllTrips(1);
    expect(component.apiService.getAllTrips).toHaveBeenCalledTimes(1);
  });

  it('ngOnInit unit test - init page', () => {
    spyOn(component.sharedMethod, 'initializedViewModel');
    spyOn(component.apiService, 'getAllTrips').and.returnValue(of({"tripList": [], "statusCode": 0, "resultMessage": ''}));
    component.ngOnInit();
    expect(component.sharedMethod.initializedViewModel).toHaveBeenCalledTimes(1);
    expect(component.apiService.getAllTrips).toHaveBeenCalledTimes(1);
  });

  it('view trip should return all relevant fields for selected trip', () => {
    let trip = new ViewTripModel();
    trip.id = 1;
    trip.budget = new BudgetModel();
    trip.budget.totalBudget = 30000;
    trip.particulars = new ParticularsModel();
    trip.particulars.name = "TEST USER";
    trip.tripDetails = new TripDetailsModel();
    trip.tripDetails.noOfDestinations = 3;
    spyOn(component.router, 'navigate');
    component.ngOnInit();
    component.viewTrip(trip);
    expect(component.sharedVar.viewTripModel.id).toBe(1);
    expect(component.sharedVar.viewTripModel.budget.totalBudget).toBe(30000);
    expect(component.sharedVar.viewTripModel.particulars.name).toBe("TEST USER");
    expect(component.sharedVar.viewTripModel.tripDetails.noOfDestinations).toBe(3);
    expect(component.router.navigate).toHaveBeenCalledTimes(1);
  });

  it('when delete trip, should call delete trip API', () => {
    spyOn(component.apiService, 'deleteTrip').and.returnValue(of({"statusCode":0,"resultMessage": ''}));
    spyOn(component.sharedVar, 'changeResponse');
    spyOn(component, 'retrieveAllTrips');
    component.deleteTrip(1);
    expect(component.apiService.deleteTrip).toHaveBeenCalledTimes(1);
    expect(component.sharedVar.changeResponse).toHaveBeenCalledTimes(1);
    expect(component.retrieveAllTrips).toHaveBeenCalledTimes(1);
  });
});
