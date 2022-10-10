import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTripViewComponent } from './manage-trip-view.component';

describe('ManageTripViewComponent', () => {
  let component: ManageTripViewComponent;
  let fixture: ComponentFixture<ManageTripViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTripViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTripViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
