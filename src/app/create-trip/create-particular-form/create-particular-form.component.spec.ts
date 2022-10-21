import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ReactiveFormService } from 'src/app/services/reactive-form.service';
import { SharedMethods } from 'src/app/services/shared-methods.service';
import { SharedVar } from 'src/app/services/shared-var.service';
import { NgbDateCustomParserFormatter } from 'src/app/shared/formatter/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';

import { CreateParticularFormComponent } from './create-particular-form.component';

describe('CreateParticularFormComponent', () => {
  let component: CreateParticularFormComponent;
  let fixture: ComponentFixture<CreateParticularFormComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateParticularFormComponent ],
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
    fixture = TestBed.createComponent(CreateParticularFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit test case', () => {
    component.sharedMethods.initializeCreateTripModel();
    component.sharedVar.createTripModel.particulars.isRegUser = true;
    component.sharedVar.createTripModel.particulars.name = "TEST USER";
    component.sharedVar.createTripModel.particulars.email = "TEST@TEST.COM";

    component.ngOnInit();

    fixture.detectChanges();
    expect(component.createTripParticularForm.valid).toBe(true);
  });

  it('enable/disable email input field when user is registered', () => {
    component.ngOnInit();
    component.staticQn1.setValue("YES");
    fixture.detectChanges();
    expect(el.nativeElement.querySelector('#email_0').disabled).toBeTruthy();
    component.staticQn1.setValue("NO");
    fixture.detectChanges();
    expect(el.nativeElement.querySelector('#email_0').disabled).toBeFalsy();
  });

  xit('retrieve email when registered user selects a name', () => {
    component.ngOnInit();
    component.name.setValue("TESTUSER");
    fixture.detectChanges();
    expect(el.nativeElement.querySelector('#email_0').disabled).toBeTruthy();
  });

});
