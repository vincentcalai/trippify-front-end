import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BudgetModel {

    public flightBudget: number;
    public hotelBudget: number;
    public attractBudget: number;
    public transportBudget: number;
    public otherBudget: number;
    public totalBudget: number;

}
