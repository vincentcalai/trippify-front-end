import { Injectable } from "@angular/core";
import { BudgetModel } from "./budget.model";
import { ParticularsModel } from "./particulars.model";
import { TripDetailsModel } from "./trip-details.model";
import { UserModel } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class CreateUserModel {

  public user: UserModel;

}
