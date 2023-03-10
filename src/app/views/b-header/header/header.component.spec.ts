import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedVar } from 'src/app/services/shared-var.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: SharedVar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [
        DatePipe,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SharedVar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('ngOnInit unit test - initialise global codes', () => {

    const destCodes = {
      "result": {
        "cdTyp": {
            "CD_DEST": [
                {"ctry": "SPAIN" , "city": ["MADRID", "BARCELONA"]},
                {"ctry": "THAILAND", "city": ["BANGKOK", "CHIANG MAI", "PHUKET", "HAT YAI", "KRABI"]},
                {"ctry": "MALAYSIA", "city": ["KUALA LUMPUR", "JOHOR BAHRU", "PENANG"]}
            ]
        }
      }
    };
    component.sharedVar.changeCodes(destCodes);
    component.ngOnInit();
    let value = component.sharedVar.destCtryList$.getValue();
    expect(component.sharedVar.destCtryList$).not.toBeNull();
    expect(value.length).toEqual(3);
    expect(value[0]).toEqual("SPAIN");
  });

  it('ngOnInit unit test - initialise all registered users', () => {
    const regUsers = {
      "regUsersList": [
        {"id": 1, "username": "TESTUSER1", "email": "TESTING1@GMAIL.COM", "contactNo": "91234567" },
        {"id": 2, "username": "TESTUSER2", "email": "TESTING2@GMAIL.COM", "contactNo": "91234568" },
        {"id": 3, "username": "TESTUSER3", "email": "TESTING3@GMAIL.COM", "contactNo": "91234569" }
      ]
    }
    component.sharedVar.changeRegUsers(regUsers);
    component.ngOnInit();
    expect(component.sharedVar.userModelList).not.toBeNull();
    expect(component.sharedVar.userModelList.length).toEqual(3);
    expect(component.sharedVar.userModelList[0].username).toEqual("TESTUSER1");
  });

  it('logout unit test', () => {
    spyOn(component.authService, 'logout');
    component.logout();
    expect(component.authService.logout).toHaveBeenCalledTimes(1);
  });
});
