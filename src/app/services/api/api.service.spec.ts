import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SharedVar } from '../shared-var.service';

import { ApiService } from './api.service';
import { componentFactoryName } from '@angular/compiler';
import { SharedMethods } from '../shared-methods.service';
import { Observable, of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

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
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('postCreateTrip method test case', () => {
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

  it('jwtAuthenticate method test case', () => {
    const username = "TESTUSER";
    const password = "password";
    const token = {
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTY3MTA3OTg4NSwiaWF0IjoxNjcwNDc5ODg1fQ.zl_AJFETUvw1WxMjPSgmSb9tTLUjFwg6AHNwS358DQL9kLWs-zYrjG4aPXIWgRlpWM4W0rCx0S0HlFkIJBWfoQ"
    };
    expect(service.jwtAuthenticate(username, password)).toBeTruthy();

    service.jwtAuthenticate(username, password).subscribe(data => {
      expect(data.token).toBe("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTY3MTA3OTg4NSwiaWF0IjoxNjcwNDc5ODg1fQ.zl_AJFETUvw1WxMjPSgmSb9tTLUjFwg6AHNwS358DQL9kLWs-zYrjG4aPXIWgRlpWM4W0rCx0S0HlFkIJBWfoQ");
    })

    const req = httpTestingController.expectOne(service.servicePrefix + '/authenticate');
    expect(req.request.method).toEqual('POST');
    req.flush(token);
  });

  it('handleError method test case', (done) => {
    let error = {message : ''};
    expect(service.handleError(error)).toEqual(jasmine.any(Observable));
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
