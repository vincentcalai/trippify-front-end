import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBudgetFormComponent } from './create-budget-form.component';

describe('CreateBudgetFormComponent', () => {
  let component: CreateBudgetFormComponent;
  let fixture: ComponentFixture<CreateBudgetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBudgetFormComponent ]
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
