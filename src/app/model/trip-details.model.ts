import { Injectable } from "@angular/core";
import { Timestamp } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TripDetailsModel {

    public noOfDestinations: number;
    public destinations: string[];
    public dateFrom: Date;
    public dateTo: Date;
    public createdBy: string;
    public createdDt: Date;

}
