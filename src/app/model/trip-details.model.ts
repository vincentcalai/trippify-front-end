import { Injectable } from "@angular/core";
import { Destinations } from "./destinations.model";

@Injectable({
  providedIn: 'root'
})
export class TripDetailsModel {

    public noOfDestinations: number;
    public destinations: Destinations[];

}
