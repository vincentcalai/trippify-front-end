import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTripDetailsFormComponent } from './create-trip-details-form.component';

describe('CreateTripDetailsFormComponent', () => {
  let component: CreateTripDetailsFormComponent;
  let fixture: ComponentFixture<CreateTripDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTripDetailsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTripDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
