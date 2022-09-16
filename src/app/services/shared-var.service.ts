import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CreateTripModel } from '../model/create-trip.model';

@Injectable({
  providedIn: 'root'
})
export class SharedVar{

  public readonly QN1_PLACEHOLDER_DESC = "Please Select Option";
  public readonly NAME_PLACEHOLDER_DESC = "Please Select A Registered User";
  public readonly FLIGHT_BUDGET_PCT = 40;
  public readonly HOTEL_BUDGET_PCT = 30;
  public readonly TRANSPORT_BUDGET_PCT = 7.5;
  public readonly ATTRACTION_BUDGET_PCT = 12.5;
  public readonly OTHER_BUDGET_PCT = 10;

  public readonly STATIC_QN_1_VAL_MAP = new Map<string, boolean>([
    ["YES", true],
    ["NO", false]
  ]);

  public createTripModel: CreateTripModel = new CreateTripModel();

  public ynListSource = new BehaviorSubject(null);
  ynListSourceList = this.ynListSource.asObservable();

  constructor() {
    this.changeYnListSource(
      Array.from( this.STATIC_QN_1_VAL_MAP.keys() )
    );
  }

  changeYnListSource(value) {
    this.ynListSource.next(value);
  }



}
