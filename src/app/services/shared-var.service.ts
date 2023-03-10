import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CreateTripModel } from '../model/create-trip.model';
import { CreateUserModel } from '../model/create-user.model';
import { Destinations } from '../model/destinations.model';
import { ResponseModel } from '../model/response.model';
import { ViewTripModel } from '../model/view-trip.model';

@Injectable({
  providedIn: 'root'
})
export class SharedVar{


  public readonly QN1_PLACEHOLDER_DESC = "Please Select Option";
  public readonly QN2_PLACEHOLDER_DESC = "Please Select Option";
  public readonly NAME_PLACEHOLDER_DESC = "Please Select A Registered User";
  public readonly TRIP_DEST_PLACEHOLDER_CTRY_DESC = "Please Select A Trip Destination Country";
  public readonly TRIP_DEST_PLACEHOLDER_CITY_DESC = "Please Select A Trip Destination City";
  public readonly FLIGHT_BUDGET_PCT = 40;
  public readonly HOTEL_BUDGET_PCT = 30;
  public readonly TRANSPORT_BUDGET_PCT = 7.5;
  public readonly FOOD_BUDGET_PCT = 7.5
  public readonly ATTRACTION_BUDGET_PCT = 10;
  public readonly OTHER_BUDGET_PCT = 5;

  public readonly YES = "YES";
  public readonly NO = "NO";

  public readonly STATIC_QN_1_VAL_MAP = new Map<string, boolean>([
    [this.YES, true],
    [this.NO, false]
  ]);

  public readonly sharedModalConfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    animated: false
  };

  public readonly STATIC_QN_2_VAL = [1,2,3,4,5,6,7,8,9,10];

  public destMap = new Map<string, string[]>();

  public createTripModel: CreateTripModel = new CreateTripModel();
  public viewTripModel: ViewTripModel = new ViewTripModel();
  public createUserModel: CreateUserModel = new CreateUserModel();

  public ynListSource = new BehaviorSubject(null);
  ynListSourceList = this.ynListSource.asObservable();

  public destNumSource = new BehaviorSubject(null);
  destNumSourceList = this.destNumSource.asObservable();

  public exceptionSource = new BehaviorSubject('');
  currentException = this.exceptionSource.asObservable();

  public responseSource = new BehaviorSubject<ResponseModel>(null);
  responseModel = this.exceptionSource.asObservable();

  public globalCodeSource = new BehaviorSubject<any>(null);
  currentGlobalCode = this.globalCodeSource.asObservable();

  public destCtryList$ = new BehaviorSubject<string[]>(null);

  constructor() {
    this.changeYnListSource(
      Array.from( this.STATIC_QN_1_VAL_MAP.keys() )
    );
    this.destNumListSource(
      this.STATIC_QN_2_VAL
    );
  }

  changeYnListSource(value) {
    this.ynListSource.next(value);
  }

  destNumListSource(value){
    this.destNumSource.next(value);
  }

  changeException(status: string) {
    this.exceptionSource.next(status);
  }

  changeResponse(resp: ResponseModel) {
    this.responseSource.next(resp);
  }

  changeCodes(codes) {
    this.globalCodeSource.next(codes);
  }

}
