import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BudgetModel {

    public isManualCal: boolean;
    public flightBudget: number;
    public hotelBudget: number;
    public attractionBudget: number;
    public transportBudget: number;
    public foodBudget: number;
    public otherBudget: number;
    public totalBudget: number;

}
