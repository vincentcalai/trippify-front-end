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
import { ResponseModel } from 'src/app/model/response.model';
import { TripDetailsModel } from 'src/app/model/trip-details.model';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';
import { NgbDateCustomParserFormatter } from 'src/app/shared/formatter/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';

import { CreatePreviewFormComponent } from './create-preview-form.component';

describe('CreatePreviewFormComponent', () => {
  let component: CreatePreviewFormComponent;
  let fixture: ComponentFixture<CreatePreviewFormComponent>;
  let destinations: Destinations[] = [];
  let destination = new Destinations();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePreviewFormComponent ],
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
    fixture = TestBed.createComponent(CreatePreviewFormComponent);
    component = fixture.componentInstance;
    component.sharedMethods.initializeCreateTripModel();
    fixture.detectChanges();

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit test case - all values from previous page should be passed to preview page', () => {
    component.sharedVar.createTripModel.particulars.name = "TEST USER";
    component.sharedVar.createTripModel.budget.totalBudget = 20000;
    component.sharedVar.createTripModel.tripDetails.noOfDestinations = 4;
    component.sharedVar.createTripModel.tripDetails.destinations[0] = destination;
    expect(component.particulars.name).toBe("TEST USER");
    expect(component.budget.totalBudget).toBe(20000);
    expect(component.tripDetails.noOfDestinations).toBe(4);
    expect(component.destinations.length).toBe(1);
  });

  it('when clicked next should show modal dialog', () => {
    spyOn(component.modalService, 'show');
    component.confirmClicked();
    expect(component.modalService.show).toHaveBeenCalledTimes(1);
  });

  it('when clicked confirm, should call create trip API', () => {
    spyOn(component.apiService, 'postCreateTrip').and.returnValue(of({"statusCode":0,"resultMessage": ''}));
    spyOn(component.sharedVar, 'changeResponse');
    component.confirmTrip();
    expect(component.apiService.postCreateTrip).toHaveBeenCalledTimes(1);
    expect(component.sharedVar.changeResponse).toHaveBeenCalledTimes(1);
  });

  it('navigate to manage trip page test', () => {
    spyOn(component.router, 'navigate');
    component.navigateToManageTripPage();
    expect(component.router.navigate).toHaveBeenCalledTimes(1);
  });

  it('navigate to create trip details page test', () => {
    spyOn(component.router, 'navigate');
    component.backToTripDetailsScreen();
    expect(component.router.navigate).toHaveBeenCalledTimes(1);
  });

});
