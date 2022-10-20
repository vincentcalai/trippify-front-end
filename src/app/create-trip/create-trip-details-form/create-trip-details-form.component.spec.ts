import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { CreateTripDetailsFormComponent } from './create-trip-details-form.component';

describe('CreateTripDetailsFormComponent', () => {
  let component: CreateTripDetailsFormComponent;
  let fixture: ComponentFixture<CreateTripDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTripDetailsFormComponent ],
      imports: [
        RouterTestingModule,
        SharedModule,
        HttpClientModule
      ],
      providers: [
        SharedVar,
        SharedMethods,
        DatePipe,
        { provide: NgbDateParserFormatter, useClass: NgbDateParserFormatter },
        BsModalService,
        ReactiveFormService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTripDetailsFormComponent);
    component = fixture.componentInstance;
    component.sharedMethods.initializeIndSubmission();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
