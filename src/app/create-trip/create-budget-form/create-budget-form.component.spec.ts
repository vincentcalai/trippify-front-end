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

import { CreateBudgetFormComponent } from './create-budget-form.component';

describe('CreateBudgetFormComponent', () => {
  let component: CreateBudgetFormComponent;
  let fixture: ComponentFixture<CreateBudgetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBudgetFormComponent ],
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
    fixture = TestBed.createComponent(CreateBudgetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
