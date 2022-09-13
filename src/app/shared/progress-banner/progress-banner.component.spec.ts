import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBannerComponent } from './progress-banner.component';

describe('ProgressBannerComponent', () => {
  let component: ProgressBannerComponent;
  let fixture: ComponentFixture<ProgressBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
