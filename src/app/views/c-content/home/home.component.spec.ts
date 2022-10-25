import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

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
