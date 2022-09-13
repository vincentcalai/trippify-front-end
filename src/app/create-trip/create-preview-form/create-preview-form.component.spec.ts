import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePreviewFormComponent } from './create-preview-form.component';

describe('CreatePreviewFormComponent', () => {
  let component: CreatePreviewFormComponent;
  let fixture: ComponentFixture<CreatePreviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePreviewFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePreviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
