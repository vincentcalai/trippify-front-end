import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ParticularsModel {

  public id: number;
  public name: string;
  public email: string;

}
