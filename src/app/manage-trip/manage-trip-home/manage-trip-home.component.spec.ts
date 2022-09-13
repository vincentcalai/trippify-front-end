import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTripHomeComponent } from './manage-trip-home.component';

describe('ManageTripHomeComponent', () => {
  let component: ManageTripHomeComponent;
  let fixture: ComponentFixture<ManageTripHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTripHomeComponent ]
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
});
