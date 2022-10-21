import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedVar } from '../shared-var.service';

import { ApiService } from './api.service';
import { componentFactoryName } from '@angular/compiler';
import { SharedMethods } from '../shared-methods.service';
import { Observable } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:  [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        SharedVar,
        SharedMethods
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('postCreateTrip method test case', () => {
    //sharedMethods.initializeCreateTripModel();
    expect(service.postCreateTrip()).toBeTruthy();
  });

  it('getAllTrips method test case', () => {
    expect(service.getAllTrips(1, 1)).toBeTruthy();
  });

  it('deleteTrip method test case', () => {
    expect(service.deleteTrip(1)).toBeTruthy();
  });

  it('postDestCodes method test case', () => {
    expect(service.postDestCodes()).toBeTruthy();
  });

  it('handleError method test case', (done) => {
    let error = {message : ''};
    expect(service.handleError(error)).toEqual(jasmine.any(Observable));
    console.log(service.handleError(error));
    service.handleError(new Error('test')).subscribe(
      value => {
        done();
      },
      error => {
        expect(error).toBeTruthy();
        done();
      })
  });
});
