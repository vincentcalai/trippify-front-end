import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedVar{

  public readonly PLACE_HOLD_DESC = "Please Select Option";

  public readonly STATIC_QN_1_VAL_MAP = new Map<string, boolean>([
    ["YES", true],
    ["NO", false]
  ]);

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