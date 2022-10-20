import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';
import { SharedModule } from '../shared.module';

import { DestinationsComponent } from './destinations.component';

describe('DestinationsComponent', () => {
  let component: DestinationsComponent;
  let fixture: ComponentFixture<DestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationsComponent ],
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
        ReactiveFormService,
        ControlContainer
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationsComponent);
    component = fixture.componentInstance;
    component.sharedMethods.initializeIndSubmission();
    component.events = new BehaviorSubject<number>(3);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
