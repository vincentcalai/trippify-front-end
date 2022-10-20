import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedVar } from './shared-var.service';

describe('SharedVarService', () => {
  let service: SharedVar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:  [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        SharedVar
      ]
    });
    service = TestBed.inject(SharedVar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
