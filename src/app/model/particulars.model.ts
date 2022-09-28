import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ParticularsModel {

  public isRegUser: boolean;
  public name: string;
  public email: string;

}
