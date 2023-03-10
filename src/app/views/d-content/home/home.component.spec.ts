import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit unit test - retrieve all registered users when launched app', () => {
    const regUsers = {
      "regUsersList": [
        {"id": 1, "username": "TESTUSER1", "email": "TESTING1@GMAIL.COM", "contactNo": "91234567" },
        {"id": 2, "username": "TESTUSER2", "email": "TESTING2@GMAIL.COM", "contactNo": "91234568" },
        {"id": 3, "username": "TESTUSER3", "email": "TESTING3@GMAIL.COM", "contactNo": "91234569" }
      ]
    };
    spyOn(component.apiService, 'retrieveRegUsers').and.returnValue(of(regUsers));
    spyOn(component.sharedVar, 'changeRegUsers');
    component.ngOnInit();
    expect(component.apiService.retrieveRegUsers).toHaveBeenCalledTimes(1);
    expect(component.sharedVar.changeRegUsers).toHaveBeenCalledTimes(1);
  });

  it('ngOnInit unit test - post destination codes when launched app', () => {
    const destCodes = {
      "result": {
        "cdTyp": {
            "CD_DEST": [
                {"ctry": "SPAIN" , "city": ["MADRID", "BARCELONA"]},
                {"ctry": "THAILAND", "city": ["BANGKOK", "CHIANG MAI", "PHUKET", "HAT YAI", "KRABI"]},
                {"ctry": "MALAYSIA", "city": ["KUALA LUMPUR", "JOHOR BAHRU", "PENANG"]}
            ]
        }
      }
    };
    spyOn(component.apiService, 'postDestCodes').and.returnValue(of(destCodes));
    spyOn(component.sharedVar, 'changeCodes');
    component.ngOnInit();
    expect(component.apiService.postDestCodes).toHaveBeenCalledTimes(1);
    expect(component.sharedVar.changeCodes).toHaveBeenCalledTimes(1);
  });

  it('ngOnInit unit test - should call change response to clear all previous messages', () => {
    spyOn(component.sharedVar, 'changeResponse');
    component.ngOnInit();
    expect(component.sharedVar.changeResponse).toHaveBeenCalledTimes(1);
  });

  it('ngOnInit unit test - should initialise create trip model', () => {
    component.ngOnInit();
    expect(component.sharedVar.createTripModel).not.toEqual(null);
    expect(component.sharedVar.createTripModel.particulars).not.toEqual(null);
    expect(component.sharedVar.createTripModel.budget).not.toEqual(null);
    expect(component.sharedVar.createTripModel.tripDetails).not.toEqual(null);
    expect(component.sharedVar.createTripModel.tripDetails.destinations).not.toEqual(null);
  });

  it('create or manage trip button clicked', () => {
    spyOn(component.sharedMethods, 'showForm');
    component.submitTripClicked('create');
    expect(component.sharedMethods.showForm).toHaveBeenCalledTimes(1);
  });
});
