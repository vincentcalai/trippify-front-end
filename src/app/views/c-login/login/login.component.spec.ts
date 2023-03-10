import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit test case, when logged in navigate to home page', () => {
    spyOn(component.authenticateService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(component.router, 'navigate');
    component.ngOnInit();
    expect(component.router.navigate).toHaveBeenCalledTimes(1);
  });

  it('ngOnInit test case, when not logged in, do not navigate to home page', () => {
    spyOn(component.authenticateService, 'isUserLoggedIn').and.returnValue(false);
    spyOn(component.router, 'navigate');
    component.ngOnInit();
    expect(component.router.navigate).toHaveBeenCalledTimes(0);
  });

  it('when click create user button, should navigate to create user screen', () => {
    spyOn(component.router, 'navigate');
    component.createUser();
    expect(component.router.navigate).toHaveBeenCalledTimes(1);
  });

  it('when login is successful, should navigate to home screen', () => {
    const token = {
      "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDSE9PTkFOTiIsImV4cCI6MTY3MTA3OTg4NSwiaWF0IjoxNjcwNDc5ODg1fQ.zl_AJFETUvw1WxMjPSgmSb9tTLUjFwg6AHNwS358DQL9kLWs-zYrjG4aPXIWgRlpWM4W0rCx0S0HlFkIJBWfoQ"
    };
    spyOn(component.router, 'navigate');
    spyOn(component.authenticateService, 'jwtAuthenticate').and.returnValue(of(token));
    component.handleJWTAuthLogin();
    expect(component.router.navigate).toHaveBeenCalledTimes(1);
  });

  it('when login is unsuccessful, should not navigate to home screen, and should throw error', () => {
    const error = new HttpErrorResponse({ status: 500 });
    spyOn(component.router, 'navigate');
    spyOn(component.authenticateService, 'jwtAuthenticate').and.returnValue(throwError(error));
    component.handleJWTAuthLogin();
    expect(component.router.navigate).toHaveBeenCalledTimes(0);
    expect(component.errorMsg).toBe("Please enter a valid credential. Login failed.");
  });



});
