import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParticularFormComponent } from './create-particular-form.component';

describe('CreateParticularFormComponent', () => {
  let component: CreateParticularFormComponent;
  let fixture: ComponentFixture<CreateParticularFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateParticularFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParticularFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
