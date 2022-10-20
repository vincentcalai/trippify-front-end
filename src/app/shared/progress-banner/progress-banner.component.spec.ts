import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';

import { ProgressBannerComponent } from './progress-banner.component';

describe('ProgressBannerComponent', () => {
  let component: ProgressBannerComponent;
  let fixture: ComponentFixture<ProgressBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressBannerComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        SharedVar,
        SharedMethods
      ]
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
