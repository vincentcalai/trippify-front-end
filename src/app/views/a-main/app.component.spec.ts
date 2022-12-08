import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SharedVar } from 'src/app/services/shared-var.service';
import { HeaderComponent } from '../b-header/header/header.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'trippify-front-end'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('trippify-front-end');
  });

  it('ngOnInit unit test - error to be shown on screen when there is exception', () => {
    component.sharedVar.changeException("This is an error text message for testing.");
    expect(component.showError).toBe(true);
    fixture.detectChanges();
    expect(el.nativeElement.querySelector('#app_error_msg')).toBeTruthy();
    expect(el.nativeElement.querySelector('#app_error_msg').textContent).toContain('This is an error text message for testing.');
  });

  it('ngOnInit unit test - no error shown on screen when there is no exception', () => {
    component.sharedVar.changeException('');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.showError).toBe(false);
    expect(el.nativeElement.querySelector('#app_error_msg')).toBeFalsy();

  });
});
