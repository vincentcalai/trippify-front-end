import { TestBed } from '@angular/core/testing';

import { SharedVar } from './shared-var.service';

describe('SharedVarService', () => {
  let service: SharedVar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedVar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
