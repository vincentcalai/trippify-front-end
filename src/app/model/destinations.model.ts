import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Destinations{
  public ctryName: string;
  public cityName: string;
  public dateFrom: {year: number, month: number, day: number};
  public dateFromStr: string;
  public dateFromDayName : string;
  public dateTo: {year: number, month: number, day: number};
  public dateToStr: string;
  public dateToDayName : string;
  public noOfTripDays: number;
}

