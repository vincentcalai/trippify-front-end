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
    console.log(value);
    expect(component.sharedVar.destCtryList$).not.toBeNull();
    expect(value.length).toEqual(3);
    expect(value[0]).toEqual("SPAIN");
  });
});
