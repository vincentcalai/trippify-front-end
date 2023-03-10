import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CreateUserModel {

  public id: number;
  public username: string;
  public password: string;
  public email: string;
  public contactNo: string;
}
