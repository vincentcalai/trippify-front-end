import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';

import { ReactiveFormService } from './reactive-form.service';
import { SharedVar } from './shared-var.service';

describe('ReactiveFormService', () => {
  let service: ReactiveFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        SharedVar,
        FormBuilder,
      ]
    });
    service = TestBed.inject(ReactiveFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
