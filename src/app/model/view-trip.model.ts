import { Injectable } from "@angular/core";
import { BudgetModel } from "./budget.model";
import { ParticularsModel } from "./particulars.model";
import { TripDetailsModel } from "./trip-details.model";

@Injectable({
  providedIn: 'root'
})
export class ViewTripModel {

  public id: number;
  public particulars: ParticularsModel;
  public budget: BudgetModel;
  public tripDetails: TripDetailsModel;

}
