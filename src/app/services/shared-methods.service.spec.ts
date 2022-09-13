import { TestBed } from '@angular/core/testing';

import { SharedMethods } from './shared-methods.service';

describe('SharedMethodsService', () => {
  let service: SharedMethods;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedMethods);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
