import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedMethods } from './shared-methods.service';
import { SharedVar } from './shared-var.service';

describe('SharedMethodsService', () => {
  let service: SharedMethods;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:  [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        SharedVar,
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(SharedMethods);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('navigate to create-trip route if create clicked button was pressed', () => {
    service.showForm('create');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['create-trip'], Object({ skipLocationChange: true }));
  });

  it('navigate to manage-trip route if manage clicked button was pressed', () => {
    service.showForm('manage');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['manage-trip'], Object({ skipLocationChange: true }));
  });
});
